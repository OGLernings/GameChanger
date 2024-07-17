import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import {
  CodePipeline,
  CodePipelineSource,
  ShellStep,
} from "aws-cdk-lib/pipelines";
import { cdkStage } from "./stage-stack";


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
  const devStage = cdkgit.addStage(
      new cdkStage(this, "dev", {
        env: { account: "862165548342", region: "us-east-1" },
      })
    );
    
  }
}
