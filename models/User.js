import { Schema, Model }  from 'mongoose';

const userSchema = new Schema({
  id: Number,
  email: {
    type: String,
    required: true,
    unique: true
  },
  userName: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String, 
    required: true
  },
})

export const User = Model('User', userSchema)