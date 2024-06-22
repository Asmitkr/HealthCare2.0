import Doctor from "../models/doctor.model.js";
import bcrypt from "bcryptjs";

export const signupDoc = async (req, res) => {
  try {
    const {
      fullName,
      email,
      password,
      confirmPassword,
      gender,
      address,
      age,
      type,
      phone,
    } = req.body;

    if (!isValidEmail(email)) {
      return res.status(400).json({ error: "Email Not Valid" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords Dont Match" });
    }

    const doc = await Doctor.findOne({ email });

    if (doc) {
      return res
        .status(400)
        .json({ error: "a Doctor with this email already exist" });
    }

    //HASH PASSWORD HERE
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newdoc = new Doctor({
      fullName,
      email,
      password: hashedPassword,
      gender,
      address,
      age,
      type,
      phone,
    });

    if (newdoc) {
      // Generate JWT Token
      //   generateTokenAndSetCookie(newUser._id, res);
      await newdoc.save();

      res.status(201).json({
        _id: newdoc._id,
        fullName: newdoc.fullName,
        email: newdoc.email,
      });
    } else {
      res.status(400).json({ error: "Invalid Doctor Data" });
    }
  } catch (error) {
    console.log("Error in Signup controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const signinDoc = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!isValidEmail(email)) {
      return res.status(400).json({ error: "Email Not Valid" });
    }
    const doc = await Doctor.findOne({ email });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      doc?.password || " "
    );

    if (!doc || !isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    //const token=jwt.sign({email:email},"USER")

    // generateTokenAndSetCookie(user._id, res);

    res.status(200).json({
      _id: doc._id,
      fullName: doc.fullName,
      email: doc.email,
      // accessToken:token
    });
  } catch (error) {
    console.log("Error in Login controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const logoutDoc = (req, res) => {
  try {
    // res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged Out Successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

function isValidEmail(email) {
  const re = /@.*\.com/;
  return re.test(email);
}
