function buildPrompt(promptFn, data = {}) {
  return promptFn(data);
}

module.exports = { buildPrompt };
