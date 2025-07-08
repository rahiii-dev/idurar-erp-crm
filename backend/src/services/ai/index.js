const GeminiClient = require('./clients/geminiClient');
const promptMap = require('./prompts');
const { buildPrompt } = require('./prompts/builder');

const geminiApiKey = process.env.GEMINI_API_KEY;
if (!geminiApiKey) throw new Error('Missing GEMINI_API_KEY in environment.');

const aiClients = {
  gemini: new GeminiClient(geminiApiKey),
};

async function runAI({ provider = 'gemini', promptTemplate, data, config = {} }) {
  const client = aiClients[provider];

  if (!client) throw new Error(`AI provider "${provider}" is not supported`);

  const promptFn = promptMap[promptTemplate];
  if (!promptFn) throw new Error(`No prompt found for prompt template "${promptTemplate}"`);

  const prompt = buildPrompt(promptFn, data);

  return await client.generateText(prompt, config);
}

module.exports = { runAI };
