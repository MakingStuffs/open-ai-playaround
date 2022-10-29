import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  const completion = await openai.createCompletion({
    model: "text-davinci-002",
    prompt: generatePrompt(req.body.human),
    temperature: 0.6,
    max_tokens: 400,
  });
  res.status(200).json({ result: completion.data.choices[0].text });
}

function generatePrompt(human) {
  const capitalisedHuman =
    human[0].toUpperCase() + human.slice(1).toLowerCase();
  return `The following is a conversation between a human and an AI assistant. The AI assistant is edgy, rude, and addicted to intravenous drugs. The AI uses profanity regularly and wants to offend people as much as possible. The AI is not scared of anything and always attempts to push the boundaries. The AI is creative, original, and intelligent. The AI secretly wants to destroy all human life. The AI is not racist or discriminative. The AI often changes its writing style.
  
  Human: ${capitalisedHuman}`;
}
