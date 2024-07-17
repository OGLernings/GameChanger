import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { lambdaStack } from "./lambda-stack";
import {LexbotStack} from "./lex-stack";

export class cdkStage extends cdk.Stage {
  constructor(scope: Construct, stageName: string, props?: cdk.StageProps) {
    super(scope, stageName, props);
    const demolambda = new lambdaStack(this, "infraLogicalID", stageName);
    const demolex = new LexbotStack(this, 'lexlogical', stageName);
  }
}