import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export default function auth(req, res, next) {
  const token = req.header("token");
  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorised, Please login first" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decoded); //user info mail nad _id
    req.user = decoded;
    // console.log(req.user, "from the auth middleware");

    next();
  } catch (err) {
    // console.log(err);
    res.status(401).json({ message: "Token is not valid" });
  }
}
