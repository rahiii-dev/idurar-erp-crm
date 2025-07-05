const mongoose = require('mongoose');

const Model = mongoose.model('Query');
const {querySchema} = require('./schemaValidate');

const update = async (req, res) => {
  const { notes, ...data } = req.body;

  const { error } = querySchema.validate(data);
  if (error) {
    const { details } = error;
    return res.status(400).json({
      success: false,
      result: null,
      message: details[0]?.message,
    });
  }

  // updating document in the collection
  const result = await Model.findOneAndUpdate({ _id: req.params.id, removed: false }, data, {
    new: true,
  }).exec();

  // Returning successfull response
  return res.status(200).json({
    success: true,
    result: result,
    message: 'Query updated successfully',
  });
};

module.exports = update;
