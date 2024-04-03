import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const teamSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: false }, // Corrected spelling of description
  users: [{ type: Schema.Types.ObjectId, ref: 'User' }] // Array of User references
});

const Team = model('Team', teamSchema);

export default Team;
