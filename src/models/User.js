import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
      select: false
    },
    role: {
      type: String,
      enum: ["user", "admin"]
    },
    isVerified: {
      type: Boolean,
      default: false
    },
    verificationToken: {type: String},
    verificationTokenExpires:{ type:Date},

    forgotPasswordToken:String,
    forgotPasswordTokenExpires:Date
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
