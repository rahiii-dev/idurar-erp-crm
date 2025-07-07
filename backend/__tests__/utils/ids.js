const mongoose = require('mongoose');

function createFakeObjectId() {
  return new mongoose.Types.ObjectId();
}

module.exports = createFakeObjectId;
