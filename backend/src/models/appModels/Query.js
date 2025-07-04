const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
      trim: true,
    },
    createdBy: { type: mongoose.Schema.ObjectId, ref: 'Admin', required: true },
  },
  {
    timestamps: true,
    _id: true,
  }
);

const querySchema = new mongoose.Schema(
  {
    customerName: {
      type: mongoose.Schema.ObjectId,
      ref: 'Client',
      required: true,
      autopopulate: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ['Open', 'InProgress', 'Closed'],
      default: 'Open',
    },
    resolution: {
      type: String,
      trim: true,
    },
    notes: [noteSchema],
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

querySchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('Query', querySchema);
