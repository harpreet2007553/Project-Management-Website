import mongooose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
  {
    fullname: {
        type : String , 
        required : true ,
        trim : true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      min : 5,
      max : 20
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    projects : {
        type : Schema.Types.ObjectId,
        ref : "Project"
    },
    password: {
      type: String,
      required: true,
    },
    avatar : {
        type: String,
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.method.isPasswordCorrect = async () => {
    return await bcrypt.compare(password, this.password);
}

userSchema.method.generateAccessToken = () => {
    const token = jwt.sign({ 
        id: this._id ,
        username : this.username ,
        email : this.email
    }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY });

    return token;
}

userSchema.method.generateRefreshToken = ()=>{
    const token =  jwt.sign({
        id: this._id ,
    }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRY });

    return token ; 
}

export const User = mongooose.model("User", userSchema);