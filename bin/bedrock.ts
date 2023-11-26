#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { BedrockStack } from '../lib/bedrock-stack';

const app = new cdk.App();
new BedrockStack(app, 'BedrockStack');
