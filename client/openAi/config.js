import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: "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",dangerouslyAllowBrowser: true
});

export async function analyze(input) {
  const stream = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: input }],
    stream: true,
  });

  let output = "";
  for await (const chunk of stream) {
    output += chunk.choices[0]?.delta?.content || "";
  }

  return output;
}

analyze().then(console.log);
