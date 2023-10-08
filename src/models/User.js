import { Schema, Model }  from 'mongoose';

const userSchema = new Schema({
  _id: Number,
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
  refreshToken: String
})

export const User = Model('User', userSchema)