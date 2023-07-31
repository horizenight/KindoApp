import { Stack } from "aws-cdk-lib";

export class CdkApp {
  private stack: Stack;
  constructor(stack: Stack) {
    this.stack = stack;
  }
  /************************************************************************/
  /******************** prepare buildspec.yaml ****************************/
  /************************************************************************/
  public getBuildSpec() {
    return {
      version: "0.2",
      env: {
        variables: {
          IMAGE_TAG: "latest",
        },
        "exported-variables": [
          "IMAGE_TAG",
          "CODEBUILD_BUILD_NUMBER",
          "CODEBUILD_RESOLVED_SOURCE_VERSION",
        ],
      },
      phases: {
        install: {
          "runtime-versions": {
            java: "corretto17",
          },
          commands: [
            "echo running install commands...",
            "COMMIT_HASH=$(echo $CODEBUILD_RESOLVED_SOURCE_VERSION | cut -c 1-8)",
            "IMAGE_TAG=${COMMIT_HASH:=latest}",
          ],
        },
        pre_build: {
          commands: [
            "echo Logging in to Amazon ECR...",
            "aws ecr get-login-password --region $AWS_DEFAULT_REGION | docker login --username AWS --password-stdin $AWS_ACCOUNT_ID.dkr.ecr.$AWS_DEFAULT_REGION.amazonaws.com",
          ],
        },
        build: {
          commands: [
            "echo Build started on `date`",
            "cd backend",
            "gradle wrapper",
            "./gradlew clean bootJar",
            "aws ecr-public get-login-password --region us-east-1 | docker login --username AWS --password-stdin public.ecr.aws",
            "docker build -t $IMAGE_REPO_NAME:$IMAGE_TAG .",
            "docker tag $IMAGE_REPO_NAME:$IMAGE_TAG $AWS_ACCOUNT_ID.dkr.ecr.$AWS_DEFAULT_REGION.amazonaws.com/$IMAGE_REPO_NAME:latest",
            "docker tag $IMAGE_REPO_NAME:$IMAGE_TAG $AWS_ACCOUNT_ID.dkr.ecr.$AWS_DEFAULT_REGION.amazonaws.com/$IMAGE_REPO_NAME:$IMAGE_TAG",
          ],
        },
        post_build: {
          commands: [
            "echo Running post build steps...",
            "docker push $AWS_ACCOUNT_ID.dkr.ecr.$AWS_DEFAULT_REGION.amazonaws.com/$IMAGE_REPO_NAME:latest",
            "docker push $AWS_ACCOUNT_ID.dkr.ecr.$AWS_DEFAULT_REGION.amazonaws.com/$IMAGE_REPO_NAME:$IMAGE_TAG",
          ],
        },
      },
      cache: {
        paths: "/root/.m2/**/*",
      },
    };
  }

  /************************************************************************/
  /******************** prepare build environment *************************/
  /************************************************************************/
  public getBuildEnvironment() {
    return {
      AWS_ACCOUNT_ID: {
        value: this.stack.account,
      },
      AWS_DEFAULT_REGION: {
        value: this.stack.region,
      },
      IMAGE_REPO_NAME: {
        value: this.stack.stackName,
      },
      IMAGE_TAG: {
        value: "latest",
      },
    };
  }
}
