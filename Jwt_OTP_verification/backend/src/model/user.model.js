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
  verificationCode: Number,
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

UserSchema.methods.generateVerificationCode = function () {
  function generateRandomFiveDigitNumber() {
    const firstDigit = Math.floor(Math.random() * 9) + 1;
    const remainingDigits = Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, 0);

    return parseInt(firstDigit + remainingDigits);
  }
  const verificationsCodegenerate = generateRandomFiveDigitNumber();
  this.verificationCode = verificationsCodegenerate;
  this.verificationsCodeExpire = Date.now() + 5 * 60 * 1000;

  return verificationCode;
};
export const User = mongoose.model("User", UserSchema);
