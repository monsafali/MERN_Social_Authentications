import mongoose from "mongoose";

import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: {
    type: String,
    minLength: [8, "password must have at least 8 character"],
    minLength: [32, "password  cannot have more than 32 charactewrs"],
  },
  phone: String,
  accountVerifed: { type: Boolean, default: false },
  verificationsCodeExpire: Date,
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  createdat: {
    type: Date,
    default: Date.now(),
  },
});
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

UserSchema.methods.comparrPassword = async function (enterredPassword) {
  return await bcrypt.compare(enterredPassword, this.password);
};

export const User = mongoose.model("User", UserSchema);
