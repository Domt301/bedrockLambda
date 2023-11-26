import { Context, Handler } from "aws-lambda";

import {
  BedrockRuntimeClient,
  InvokeModelCommand,
} from "@aws-sdk/client-bedrock-runtime";

interface PromptBody {
  prompt: String;
}

export const handler: Handler = async (event: PromptBody) => {
  try {
    const { prompt } = event;

    const client = new BedrockRuntimeClient({
      region: "us-east-1",
    });

    const response: any = await client.send(
      new InvokeModelCommand({
        modelId: "ai21.j2-mid-v1",
        contentType: "application/json",
        accept: "*/*",
        body: JSON.stringify({
          prompt,
          maxTokens: 200,
          temperature: 0.7,
          topP: 1,
          stopSequences: [],
          countPenalty: { scale: 0 },
          presencePenalty: { scale: 0 },
          frequencyPenalty: { scale: 0 },
        }),
      })
    );
    const jsonString = Buffer.from(response.body).toString("utf8");
    const parsedDataText = JSON.parse(jsonString);
    return parsedDataText.completions[0].data.text;
  } catch (err) {
    console.log(err);
    throw new Error("Something went wrong while invoking model");
  }
};

export default handler;