import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      max: [20, "User first name can not exit 20 characters."],
    },
    lastName: {
      type: String,
      max: [20, "User last name can not exit 20 characters."],
    },
    email: {
      type: String,
      max: [30, "User email can not exit 20 characters."],
    },
    password: {
      type: String,
      max: [30, "User email can not exit 20 characters."],
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const userModel = mongoose.model("User", UserSchema);
export default userModel;
