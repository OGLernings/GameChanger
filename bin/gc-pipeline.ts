#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { GcPipelineStack } from '../lib/gc-pipeline-stack';

const app = new cdk.App();
new GcPipelineStack(app, 'GcPipelineStack', {
  env: { account: "862165548342", region: "us-east-1" },
});