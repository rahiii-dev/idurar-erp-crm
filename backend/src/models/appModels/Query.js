const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
    _id: true,
  }
);

const querySchema = new mongoose.Schema(
  {
    client: {
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
    createdBy: { type: mongoose.Schema.ObjectId, ref: 'Admin', required: true },
    removed: {
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
