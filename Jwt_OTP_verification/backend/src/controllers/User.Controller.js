import { catchAsyncError } from "../middleware/CatchAsynchError";
import ErrorHandler from "../middleware/Error.js";
import { User } from "../model/user.model.js";

export const register = catchAsyncError(async (req, res, next) => {
  try {
    const { name, email, phone, password, verificationMethod } = req.body;

    if (!name || !email || !phone || !password || !verificationMethod) {
      return next(new ErrorHandler("All fields are required,", 400));
    }
    function ValidatePhoneNumber(phone) {
      const phoneRegex = /^\+923\d{9}$/;
      return phoneRegex.text(phone);
    }

    if (!ValidatePhoneNumber(phone)) {
      return next(new ErrorHandler("invalid phone number", 400));
    }
    const existineUser = await User.findOne({
      $or: [
        { email, accountVerifed: true },
        { phone, accountVerifed: true },
      ],
    });

    if (existineUser) {
      return next(new ErrorHandler("hone or email is already registered", 400));
    }
    const registrationAtemptsByUser = await User.find({
      $or: [
        { phone, accountVerifed: false },
        { email, accountVerifed: false },
      ],
    });

    if (registrationAtemptsByUser.length >= 3) {
      return next(
        new ErrorHandler(
          "you have exceeded the maximum number of atttmpt (3) pleawe try again after and hour",
          400
        )
      );
    }

    const userData = {
      name: email,
      phone,
      password,
    };

    const user = await User.create(userData);
    const verificationsCode = await user.generateVerificationCode();
    await user.save();

    sendVerificationCode(verificationMethod, verificationsCode, email, phone);
    res.status(200).json({
      success: true,
    });
  } catch (error) {
    next(error);
  }
});
