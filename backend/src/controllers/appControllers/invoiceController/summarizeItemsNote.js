const mongoose = require('mongoose');

const ai = require('@/services/ai');
const Model = mongoose.model('Invoice');

const summarizeNotes = async (req, res) => {
  const invoice = await Model.findOne({ _id: req.params.id, removed: false }).lean();
  if (!invoice) {
    return res.status(404).json({
      success: false,
      result: null,
      message: 'Invoice not found',
    });
  }

  const notes = invoice.items
    .filter((item) => !!item.notes)
    .map((item) => `Product: ${item.itemName}, Notes: ${item.notes}`);


  if (!notes || notes.length === 0) {
    return res.status(404).json({
      success: false,
      result: null,
      message: 'No notes found in the invoice items',
    });
  }

  try {
    const summary = await ai.runAI({
      promptTemplate: 'invoiceSummary',
      data: { notes },
    });

    await Model.findByIdAndUpdate(req.params.id, { itemsNoteSummary: summary })

    res.status(200).json({
      success: true,
      result: summary,
      message: 'Summary generated and saved to invoice.',
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      result: null,
      message: "Can't generate a summary now.",
    });
  }
};

module.exports = summarizeNotes;
