import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const userSchema = new Schema({
  id: { type: Number, required: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true },
  gender: { type: String, required: true },
  avatar: { type: String, required: true },
  domain: { type: String, required: true },
  available: { type: Boolean, required: true },
});

const User = model('User', userSchema);

export default User;

