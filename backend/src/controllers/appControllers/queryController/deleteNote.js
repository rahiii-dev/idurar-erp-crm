const mongoose = require('mongoose');

const Model = mongoose.model('Query');

const deleteNote = async (req, res) => {
  const { id, noteId } = req.params;

  // add new note to query
  const result = await Model.findOneAndUpdate(
    { _id: id, removed: false },
    {
      $pull: { notes: { _id: noteId } }
    },
    {
      new: true,
    }
  ).exec();

  // Returning successfull response
  return res.status(200).json({
    success: true,
    result: result,
    message: 'Note removed from Query successfully',
  });
};

module.exports = deleteNote;
