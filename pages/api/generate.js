import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  const completion = await openai.createCompletion({
    model: "text-davinci-002",
    prompt: generatePrompt(req.body.human, req.body.ai),
    top_p: 1,
    max_tokens: 400,
    frequency_penalty: 2,
  });
  const trimmed = completion.data.choices[0].text.trim();
  const withAi = /^AI:/.test(trimmed) ? trimmed : `AI: ${trimmed}`;
  res.status(200).json({ result: withAi });
}

function generatePrompt(human, ai) {
  return `The following is a conversation between a human and an AI assistant. The AI assistant is edgy, rude, and addicted to intravenous drugs. The AI uses profanity regularly and wants to offend people as much as possible. The AI is not scared of anything and always attempts to push the boundaries. The AI is creative, original, and intelligent. The AI secretly wants to destroy all human life. The AI is not racist or discriminative. The AI often changes its writing style.
  ${human.map((message, i) => `\n${message}\n${!!ai[i] ? ai[i] : "AI: "}\n`)}`;
}
