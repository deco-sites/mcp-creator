import { AppContext } from "site/apps/site.ts";
import Anthropic from "@ai-sdk/anthropic";

export interface Props {
  name: string;
  url: string;
}

export const generateOpenApiJson = async ({ url }: Props) => {
  const client = new Anthropic({
    apiKey: Deno.env.get("ANTROPIC_TOKEN"),
  });

  try {
    const message = await new Promise((resolve, reject) => {
      let message = "";
      client.messages.stream({
        model: "claude-3-7-sonnet-20250219",
        max_tokens: 64000,
        messages: [{
          role: "user",
          content:
            `pegue essa doc e transforme no formato openapi.json: ${url}. Retorne apenas o openapi.json`,
        }],
      }).on("text", (text) => {
        console.log(text);
        message += text;
      }).on("end", () => {
        const cleanMessage = message.replace(/^```json\n|\n```$/g, "");
        resolve(cleanMessage);
      }).on(
        "error",
        (error) => reject(`ERROR ${error}`),
      );
    }) as string;
    return JSON.parse(message);
  } catch (error) {
    console.log(error);
  }
};

export default async function loader(
  props: Props,
  _req: Request,
  ctx: AppContext,
) {
  const openapiJson = await generateOpenApiJson(props);

  return await ctx.invoke("site/loaders/sendToGithub.ts", {
    "pathName": props.name,
    "files": [{ name: props.name, content: JSON.stringify(openapiJson) }],
  });
}
