const { GoogleGenAI  } = require('@google/genai');
const BaseClient = require('./baseClient');

class GeminiClient extends BaseClient {
  constructor(apiKey) {
    super();
    this.genAI = new GoogleGenAI({apiKey});
  }

  async generateText(prompt, config = {}) {
    try {
      const {model = "gemini-2.5-flash", ...options} = config;

      const response = await this.genAI.models.generateContent({
        model,
        contents: [{ text: prompt }],
        config: options
      })

      return response.text;
    } catch (error) {
      throw new Error(`Failed to generate text from Gemini \n Error: ${error.messaage}`);
    }
  }
}

module.exports = GeminiClient;
