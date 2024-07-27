import User from "../models/User.js";

class UserOperations {
  static registerUser = async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const errors = [
        { field: name, message: "Name is required" },
        { field: email, message: "Email is required" },
        { field: password, message: "Password is required" },
      ];

      for (const error of errors) {
        if (!error.field) {
          return res
            .status(400)
            .json({ message: error.message, success: false });
        }
      }

      const existingUser = await User.findOne({
        email,
      });
      if (existingUser) {
        return res
          .status(400)
          .json({ message: "User already exists", success: false });
      }

      const user = new User({
        name,
        email,
        password,
      });
      await user.save();
      const token = user.generateAuthToken();

      // save token to the cookie
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "development",
        maxAge: 3600000,
      });

      const userResponse = await User.findById(user._id).select("-password");
      res.status(201).json({
        user: userResponse,
        token,
        success: true,
        message: `Welcome ${name} 🚀`,
      });
    } catch (error) {
      // console.log(error);
      return res
        .status(500)
        .json({ message: "Failed to register user", success: false });
    }
  };

  static loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
      const errors = [
        { field: email, message: "Email is required" },
        { field: password, message: "Password is required" },
      ];

      for (const error of errors) {
        if (!error.field) {
          return res
            .status(400)
            .json({ message: error.message, success: false });
        }
      }

      const user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ message: "Invalid credentials", success: false });
      }

      const isMatch = await user.matchPassword(password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ message: "Invalid credentials", success: false });
      }

      const token = await user.generateAuthToken();
      const userResponse = await User.findById(user._id).select("-password");
      res.status(200).json({
        user: userResponse,
        token,
        success: true,
        message: `Welcome back ${user.name} 🚀`,
      });
    } catch (error) {
      // console.log(error)
      return res
        .status(500)
        .json({ message: "Failed to login user", success: false });
    }
  };
}

export default UserOperations;
