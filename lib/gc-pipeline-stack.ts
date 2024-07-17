import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import {
  CodePipeline,
  CodePipelineSource,
  ShellStep,
} from "aws-cdk-lib/pipelines";
import { lambdaStack } from './lambda-stack';
import {LexbotStack} from './lex-stack'

export class GcPipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

  const cdkgit = new CodePipeline(this, "logicalcdkgit", {
      synth: new ShellStep("Synth", {
        input: CodePipelineSource.gitHub("OGLernings/GameChanger", "main"),
        commands: ["npm ci", "npm run build", "npx cdk synth"],
      }),
      pipelineName: "GameChanger-Pipeline",
    });
    
    new lambdaStack(this, 'lambdaStack', {
      
      env: { account: "862165548342", region: "us-east-1" },
      });
    new LexbotStack(this, 'lexStack', {
      env: { account: "862165548342", region: "us-east-1" },
      });
  }
}
