const mongoose = require('mongoose');

const Model = mongoose.model('Query');
const { noteSchema } = require('./schemaValidate');

const addNote = async (req, res) => {
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
  const result = await Model.findOneAndUpdate({ _id: req.params.id, removed: false }, {
    $push: { notes: body }
  }, {
    new: true,
  }).exec();

  // Returning successfull response
  return res.status(200).json({
    success: true,
    result: result,
    message: 'Note added to Query successfully',
  });
};

module.exports = addNote;
