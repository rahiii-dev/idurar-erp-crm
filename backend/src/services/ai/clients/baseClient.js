class BaseClient {
  async generateText(prompt, config = {}) {
    throw new Error('generateText() must be implemented');
  }
}

module.exports = BaseClient;
