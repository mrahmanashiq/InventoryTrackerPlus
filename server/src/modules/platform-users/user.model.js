import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      required: true,
    },
    permissions: {
      type: Array,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model('User', userSchema);