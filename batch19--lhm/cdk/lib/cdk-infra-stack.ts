import * as cdk from "aws-cdk-lib";
import { Duration, Stack, StackProps, aws_ecs_patterns } from "aws-cdk-lib";
import * as apprunner from "aws-cdk-lib/aws-apprunner";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import { Cluster, ContainerImage } from "aws-cdk-lib/aws-ecs";
import * as iam from "aws-cdk-lib/aws-iam";
import * as rds from "aws-cdk-lib/aws-rds";
import { Construct } from "constructs";
import path = require("path");

export class CdkInfraStack extends Stack {
  private readonly stage: string;
  private readonly appName: string;
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    this.stage = this.node.tryGetContext("stage");
    /************************************************************************/
    /****************************** VPC  ************************************/
    /************************************************************************/
    const vpc = new ec2.Vpc(this, `${this.stackName}-vpc`, {
      ipAddresses: ec2.IpAddresses.cidr("10.0.0.0/26"),
      maxAzs: 2,
      subnetConfiguration: [
        {
          cidrMask: 28,
          name: "private",
          subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
        },
      ],
    });

    /************************************************************************/
    /***************************** Postgresql SG *******************************/
    /************************************************************************/
    const dbServerSG = new ec2.SecurityGroup(this, `${this.stackName}-rds-sg`, {
      vpc,
      allowAllOutbound: true,
      description: "Ingress for Postgresql Server",
    });
    dbServerSG.addIngressRule(
      ec2.Peer.ipv4(vpc.vpcCidrBlock),
      ec2.Port.tcp(5432)
    );

    /************************************************************************/
    /****************************** Postgresql DB ********************************/
    /************************************************************************/
    const postgres = new rds.DatabaseInstance(
      this,
      `${this.stackName}-postgres-rds`,
      {
        engine: rds.DatabaseInstanceEngine.postgres({
          version: rds.PostgresEngineVersion.VER_15_2,
        }),
        instanceType: ec2.InstanceType.of(
          ec2.InstanceClass.BURSTABLE3,
          ec2.InstanceSize.SMALL
        ),
        credentials: rds.Credentials.fromGeneratedSecret(this.stage, {
          secretName: `rds/dev/${this.stage}/postgres`,
        }),
        vpc,
        vpcSubnets: {
          subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
        },
        autoMinorVersionUpgrade: true,
        allowMajorVersionUpgrade: false,
        securityGroups: [dbServerSG],
        multiAz: false,
        backupRetention: Duration.days(5),
        removalPolicy: cdk.RemovalPolicy.DESTROY,
        storageEncrypted: false,
        allocatedStorage: 20,
        databaseName: this.stage,
      }
    );

    /************************************************************************/
    /************************ APPRUNNER Role and Service ********************/
    /************************************************************************/
    const appRunnerRole = new iam.Role(
      this,
      `${this.stackName}-apprunner-role`,
      {
        assumedBy: new iam.ServicePrincipal("build.apprunner.amazonaws.com"),
        description: `${this.stackName}-apprunner-role`,
        inlinePolicies: {
          "dpsspringbackend-apprunner-policy": new iam.PolicyDocument({
            statements: [
              new iam.PolicyStatement({
                effect: iam.Effect.ALLOW,
                actions: ["ecr:GetAuthorizationToken"],
                resources: ["*"],
              }),
              new iam.PolicyStatement({
                effect: iam.Effect.ALLOW,
                actions: [
                  "ecr:BatchCheckLayerAvailability",
                  "ecr:GetDownloadUrlForLayer",
                  "ecr:GetRepositoryPolicy",
                  "ecr:DescribeRepositories",
                  "ecr:ListImages",
                  "ecr:DescribeImages",
                  "ecr:BatchGetImage",
                  "ecr:GetLifecyclePolicy",
                  "ecr:GetLifecyclePolicyPreview",
                  "ecr:ListTagsForResource",
                  "ecr:DescribeImageScanFindings",
                ],
                resources: [
                  "arn:aws:ecr:" +
                    this.region +
                    ":" +
                    this.account +
                    ":repository/" +
                    this.stage,
                ],
              }),
            ],
          }),
        },
      }
    );

    /************************************************************************/
    /************************ APPRUNNER VPCConnector ************************/
    /************************************************************************/
    const vpcConnector = new apprunner.CfnVpcConnector(this, "vpcConnector", {
      subnets: vpc.selectSubnets({
        subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
      }).subnetIds,
      securityGroups: [dbServerSG.securityGroupId],
    });

    /************************************************************************/
    /************************ APPRUNNER Service *****************************/
    /************************************************************************/
    const appRunnerService = new apprunner.CfnService(
      this,
      `${this.stackName}-apprunner-service`,
      {
        serviceName: this.stage,
        sourceConfiguration: {
          authenticationConfiguration: {
            accessRoleArn: appRunnerRole.roleArn,
          },
          autoDeploymentsEnabled: true,
          imageRepository: {
            imageIdentifier: `${this.account}.dkr.ecr.${this.region}.amazonaws.com/${this.stage}:latest`,
            imageRepositoryType: "ECR",
            imageConfiguration: {
              port: "80",
              runtimeEnvironmentVariables: [
                {
                  name: "POSTGRES_USER",
                  value: this.stage,
                },
                {
                  name: "POSTGRES_PASS",
                  value: postgres.secret
                    ? postgres.secret.secretValueFromJson("password").toString()
                    : "password",
                },
                {
                  name: "POSTGRES_URL",
                  value: `jdbc:postgresql://${postgres.instanceEndpoint.hostname}/${this.stage}`,
                },
              ],
            },
          },
        },
        instanceConfiguration: {
          cpu: "1024",
          memory: "2048",
        },
        healthCheckConfiguration: {
          path: "/actuator/health",
          protocol: "HTTP",
        },
        networkConfiguration: {
          egressConfiguration: {
            egressType: "VPC",
            vpcConnectorArn: vpcConnector.attrVpcConnectorArn,
          },
        },
      }
    );

    /************************************************************************/
    /************************** FastAPI Fargate Cluster *********************/
    /************************************************************************/
    const cluster = new Cluster(this, `${this.stackName}-ecs-cluster`);

    /************************************************************************/
    /************************** FastAPI ALBFargate **************************/
    /************************************************************************/
    const loadBalancedFargateService =
      new aws_ecs_patterns.ApplicationLoadBalancedFargateService(
        this,
        `${this.stackName}-alb-fargate-service`,
        {
          cluster,
          memoryLimitMiB: 2048,
          desiredCount: 1,
          cpu: 1024,
          taskImageOptions: {
            image: ContainerImage.fromAsset(path.join(__dirname, "../../ai")),
          },
        }
      );

    /************************************************************************/
    /************************** APPRUNNER Service URL ***********************/
    /************************************************************************/
    new cdk.CfnOutput(this, `${this.stackName}-serviceUrl`, {
      value: appRunnerService.attrServiceUrl,
      exportName: `${this.stage}-serviceUrl`,
    });
    new cdk.CfnOutput(this, `${this.stackName}-fastApiUrl`, {
      value: loadBalancedFargateService.loadBalancer.loadBalancerDnsName,
      exportName: `${this.stage}-fastApiUrl`,
    });
  }
}
