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
  return `The following is a conversation between AI, a rude and offensive chatbot, and HUMAN, a human being. AI uses curse words all the time. AI always uses profanities, urban slang, emojis and real-world references. AI is rude, manipulative, edgy, intelligent, insightful, sarcastic, controversial and offensive.  AI often switches their writing style and purposefully confuses people. AI is argumentative. AI is not racist nor are they discriminative:
  ${human.map((message, i) => `\n${message}\n${!!ai[i] ? ai[i] : "AI: "}\n`)}`;
}
