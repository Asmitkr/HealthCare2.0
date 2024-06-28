import User from "../models/user.model.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");
    console.log(users);

    res.status(200).json(users);
  } catch (error) {
    console.log("Error in getuser: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
