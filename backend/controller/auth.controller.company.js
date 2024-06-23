import Company from "../models/company.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../util/token.js";

export const signupComp = async (req, res) => {
  try {
    const { fullName, email, password, confirmPassword, address, phone } =
      req.body;

    if (!isValidEmail(email)) {
      return res.status(400).json({ error: "Email Not Valid" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords Dont Match" });
    }

    const comp = await Company.findOne({ email });

    if (comp) {
      return res
        .status(400)
        .json({ error: "a Company with this email already exist" });
    }

    //HASH PASSWORD HERE
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newcomp = new Company({
      fullName,
      email,
      password: hashedPassword,
      address,
      phone,
    });

    if (newcomp) {
      // Generate JWT Token
      generateTokenAndSetCookie(newcomp._id, res);
      await newcomp.save();

      res.status(201).json({
        _id: newcomp._id,
        fullName: newcomp.fullName,
        email: newcomp.email,
      });
    } else {
      res.status(400).json({ error: "Invalid Company Data" });
    }
  } catch (error) {
    console.log("Error in company Signup controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const signinComp = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email);
    if (!isValidEmail(email)) {
      return res.status(400).json({ error: "Email Not Valid" });
    }
    const Comp = await Company.findOne({ email });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      Comp?.password || ""
    );

    if (!Comp || !isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    //const token=jwt.sign({email:email},"USER")

    generateTokenAndSetCookie(Comp._id, res);

    res.status(200).json({
      _id: Comp._id,
      fullName: Comp.fullName,
      email: Comp.email,
      // accessToken:token
    });
  } catch (error) {
    console.log("Error in Company Login controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const logoutComp = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
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
