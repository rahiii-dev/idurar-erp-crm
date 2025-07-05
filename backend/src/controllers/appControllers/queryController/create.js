const mongoose = require('mongoose');

const Model = mongoose.model('Query');
const {querySchema} = require('./schemaValidate');

const create = async (req, res) => {
  let body = req.body;

  const { error } = querySchema.validate(body);
  if (error) {
    const { details } = error;
    return res.status(400).json({
      success: false,
      result: null,
      message: details[0]?.message,
    });
  }

  body['createdBy'] = req.admin._id;

  // Creating a new document in the collection
  const result = await new Model(body).save();

  // Returning successfull response
  return res.status(200).json({
    success: true,
    result: result,
    message: 'Query created successfully',
  });
};

module.exports = create;
