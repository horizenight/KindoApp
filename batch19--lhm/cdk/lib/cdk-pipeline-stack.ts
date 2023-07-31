import * as cdk from "aws-cdk-lib";
import { StackProps } from "aws-cdk-lib";
import * as codebuild from "aws-cdk-lib/aws-codebuild";
import * as iam from "aws-cdk-lib/aws-iam";
import {
  CodeBuildStep,
  CodePipeline,
  CodePipelineSource,
} from "aws-cdk-lib/pipelines";
import { Construct } from "constructs";
import { CdkApp } from "./cdk-app";
import { CdkPipelineECRStage } from "./cdk-pipeline-ecr-stage";
import { CdkPipelineInfraStage } from "./cdk-pipeline-infra-stage";

export interface PipelineServiceStackProps extends StackProps {
  codeConnection: String;
  repositoryName: String;
  repositoryOrganization: String;
  branchName: String;
}

export class CdkPipelineStack extends cdk.Stack {
  constructor(
    scope: Construct,
    id: string,
    {
      codeConnection,
      repositoryName,
      repositoryOrganization,
      branchName,
      ...props
    }: PipelineServiceStackProps
  ) {
    super(scope, id, props);

    /************************************************************************/
    /************************* Code Pipeline  *******************************/
    /************************************************************************/
    const pipeline = new CodePipeline(this, `${this.stackName}-pipeline`, {
      pipelineName: `${this.stackName}-pipeline`,
      selfMutation: true,
      crossAccountKeys: true,
      synth: new CodeBuildStep(`${this.stackName}-synth`, {
        projectName: `${this.stackName}-synth`,
        input: CodePipelineSource.connection(
          `${repositoryOrganization}/${repositoryName}`,
          `${branchName}`,
          {
            connectionArn: `arn:${this.partition}:codestar-connections:${this.region}:${this.account}:connection/${codeConnection}`,
            triggerOnPush: true,
          }
        ),
        installCommands: ["npm install -g aws-cdk"],
        commands: ["cd cdk", "npm ci", "npm run build", "npx cdk synth"],
        primaryOutputDirectory: "cdk/cdk.out",
        buildEnvironment: {
          computeType: codebuild.ComputeType.MEDIUM,
        },
      }),
    });

    /************************************************************************/
    /************************* Code Build Role  *****************************/
    /************************************************************************/
    const buildRole = new iam.Role(this, `${this.stackName}-build-role`, {
      assumedBy: new iam.ServicePrincipal("codebuild.amazonaws.com"),
      description: `${this.stackName}-build-role`,
      inlinePolicies: {
        "dpsspringbackend-code-build-policy": new iam.PolicyDocument({
          statements: [
            new iam.PolicyStatement({
              effect: iam.Effect.ALLOW,
              actions: ["secretsmanager:GetSecretValue"],
              resources: [
                `arn:${this.partition}:secretsmanager:${this.region}:${this.account}:secret:dockerhub_credentials`,
              ],
            }),
            new iam.PolicyStatement({
              effect: iam.Effect.ALLOW,
              actions: [
                "ecr:GetAuthorizationToken",
                "ecr-public:GetAuthorizationToken",
                "sts:GetServiceBearerToken",
              ],
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
                "ecr:InitiateLayerUpload",
                "ecr:UploadLayerPart",
                "ecr:CompleteLayerUpload",
                "ecr:PutImage",
              ],
              resources: [
                `arn:${this.partition}:ecr:${this.region}:${
                  this.account
                }:repository/${this.node.tryGetContext("stage")}`,
              ],
            }),
          ],
        }),
      },
    });

    /************************************************************************/
    /************************* Code Build Stage  ****************************/
    /************************************************************************/
    const app = new CdkApp(this);
    const build = new CdkPipelineECRStage(this, `${this.stackName}-build`);
    pipeline.addStage(build, {
      post: [
        new CodeBuildStep(`${this.stackName}-build`, {
          projectName: `${this.stackName}-build`,
          partialBuildSpec: codebuild.BuildSpec.fromObject(app.getBuildSpec()),
          commands: ["echo building app"],
          buildEnvironment: {
            buildImage: codebuild.LinuxBuildImage.AMAZON_LINUX_2_4,
            computeType: codebuild.ComputeType.MEDIUM,
            privileged: true,
            environmentVariables: app.getBuildEnvironment(),
          },
          role: buildRole,
        }),
      ],
    });

    /************************************************************************/
    /************************* Code Deploy Stage  ***************************/
    /************************************************************************/
    const deploy = new CdkPipelineInfraStage(this, `${this.stackName}-deploy`);
    pipeline.addStage(deploy);
  }
}
