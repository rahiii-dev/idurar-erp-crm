const mongoose = require('mongoose');

const Model = mongoose.model('Query');
const { noteSchema } = require('./schemaValidate');

const updateNote = async (req, res) => {
  const { id, noteId } = req.params;
  let body = req.body;

  //only validate note
  const { error } = noteSchema.validate(body);
  if (error) {
    const { details } = error;
    return res.status(400).json({
      success: false,
      result: null,
      message: details[0]?.message,
    });
  }

  // add new note to query
  const result = await Model.findOneAndUpdate(
    { _id: id, 'notes._id': noteId, removed: false },
    {
      $set: { 'notes.$.content': body.content }
    },
    {
      new: true,
    }
  ).exec();

  // Returning successfull response
  return res.status(200).json({
    success: true,
    result: result,
    message: 'Note updated successfully',
  });
};

module.exports = updateNote;
