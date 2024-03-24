import express from "express";
import User_model from "../models/UserAuth.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();
const secret_key = "adhewegfrithregrigheofeiofneojeokgroegh";

router.post("/signup", async (req, res) => {
  try {
    const { username, password, email, Address } = req.body;
    console.log(req.body);
    const existing_User = await User_model.findOne({ email });

    if (existing_User) {
      return res.status(200).json({ msg: "User already exists" });
    }

    const hashed_password = await bcryptjs.hashSync(password, 10);

    const new_User = await User_model.create({
      username,
      email,
      Address,
      password: hashed_password,
    });

    return res.status(200).send({ msg: "User created successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ msg: error });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const existing_User = await User_model.findOne({ email });

    if (!existing_User) {
      return res.status(500).json({ msg: "User is not registered" });
    }

    const valid_password = await bcryptjs.compare(
      password,
      existing_User.password
    );
    if (!valid_password) {
      return res.status(400).send({ message: "Wrong password" });
    }

    const token = jwt.sign({ id: existing_User._id }, secret_key);
    res.cookie("token", token, { httpOnly: true, secure: true, sameSite: "none" });
    return res.status(200).send(token)
  } catch (error) {
    console.log(error);
    return res.status(500).send({ msg: error });
  }
});

router.get('/logout',async(req,res)=>{
  // console.log("asdlkfj")
   res.clearCookie("token").json({msg:"hogayakam"})
})

export default router;


