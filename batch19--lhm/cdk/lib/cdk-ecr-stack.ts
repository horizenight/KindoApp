import * as cdk from "aws-cdk-lib";
import { Duration, Stack, StackProps } from "aws-cdk-lib";
import * as ecr from "aws-cdk-lib/aws-ecr";
import { TagStatus } from "aws-cdk-lib/aws-ecr";
import { Construct } from "constructs";

export interface CdkECRStackProps extends StackProps {
  readonly appName?: string;
}

export class CdkECRStack extends Stack {
  constructor(scope: Construct, id: string, props?: CdkECRStackProps) {
    super(scope, id, props);

    /************************************************************************/
    /************************* Create ECR Repo ******************************/
    /************************************************************************/
    const repository = new ecr.Repository(this, `${this.stackName}-ecr`, {
      repositoryName: this.node.tryGetContext("stage"),
      imageScanOnPush: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    /************************************************************************/
    /************************* Add Lifecycle Rules **************************/
    /************************************************************************/
    repository.addLifecycleRule({
      tagStatus: TagStatus.ANY,
      maxImageCount: 10,
    });
    repository.addLifecycleRule({
      tagStatus: TagStatus.UNTAGGED,
      maxImageAge: Duration.days(1),
    });
  }
}
