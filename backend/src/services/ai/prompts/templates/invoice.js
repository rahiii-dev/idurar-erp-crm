function invoiceSummaryPrompt({ notes = [] }) {
  if (notes.length === 0) return 'No notes available.';

  return `
You are an AI that summarizes invoice item notes.

Notes:
${notes.map((note, i) => `${i + 1}. ${note}`).join('\n')}

Return a business-friendly summary.
  `.trim();
}

module.exports = { invoiceSummaryPrompt };
