import {
  Stack,
  StackProps,
  aws_lambda_nodejs,
  aws_lambda,
  aws_iam,
  Duration,
  CfnOutput
} from "aws-cdk-lib";
import { Construct } from "constructs";
import * as path from "path";


export class BedrockStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const bedrockLambda = new aws_lambda_nodejs.NodejsFunction(
      this,
      "BedrockLambda",
      {
        runtime: aws_lambda.Runtime.NODEJS_16_X,
        handler: "handler",
        entry: path.join(__dirname, "../src/lambda/bedrock/index.ts"),
        bundling: {
          forceDockerBundling: false,
        },
        timeout: Duration.seconds(90),
      }
    );

    bedrockLambda.addToRolePolicy(
      new aws_iam.PolicyStatement({
        actions: ["bedrock-runtime:InvokeModel"],
        resources: ["*"],
      })
    );
  }
}
