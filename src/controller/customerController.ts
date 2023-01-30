import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../models/User";
import { validationResult } from "express-validator";
import { config } from "dotenv";
const secret: any = "SECRET_KEY";

config();
let refreshTokens: any[] = [];

export const signup = async (req: any, res: any) => {

  if (req.body == null)
    return res.status(400).json({ message: "Empty Body Received" });

  const errors = validationResult(req); 

  if (!errors.isEmpty()) return res.status(422).jsonp(errors.array());

  try {
    const { email, password ,name } = req.body;
   

    const result = await User.create({
      email: email,
      name: name,
      password: password,
    });
    console.log("Result=" + JSON.stringify(result));
    result
      .save()
      .then((data: any) => {
        console.log(data);
        const token = jwt.sign({ email: data.email, id: data._id ,name: data.name, password: data.password }, secret, {
          expiresIn: "5m",
        });
        const refreshToken = jwt.sign(
          { email: data.email, id: data._id },
          secret,
          { expiresIn: "15m" }
        );
        refreshTokens.push(refreshToken);
        res.status(201).json({ token: token, refreshToken: refreshToken });
      })
      .catch((err: any) => console.error(err));
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

export const signin = async (req: any, res: any) => {
  if (req.body == null)
    return res.status(400).json({ message: "Empty Body Received" });
  const errors = validationResult(req); //422Unprocessable Entity //400Bad Request
  if (!errors.isEmpty()) return res.status(422).jsonp(errors.array());

  const { email, password } = req.body;

  try {
    const existingUser: any = await User.findOne({ where: { email: email } });
    console.log(existingUser.dataValues);
    if (!existingUser) {
      return res.status(400).json({ message: "User doesn't exists" });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const accessToken = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      "SECRET_KEY",
      { expiresIn: "1m" }
    );
    const refreshToken = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      "REFRESH_TOKEN_KEY",
      { expiresIn: "15m" }
    );
    refreshTokens.push(refreshToken);
    return res.status(201).json({ accessToken, refreshToken });
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const refreshToken = async (req: any, res: any) => {
  const postData = req.body;
  if (postData.refreshToken) {
    const user = {
      email: postData.email,
      id: postData.id,
    };
    const token = jwt.sign(user, "SECRET_KEY", { expiresIn: "40s" });
    const response = {
      token: token,
    };
    // update the token in the list
    // tokenList[postData.refreshToken].token = token
    res.status(200).json(response);
  } else {
    res.status(404).send("Invalid request");
  }
};

export const logout = (req: any, res: any) => {
  refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
  res.sendStatus(204);
};

export const test = async (req: any, res: any) => {
  res.send("Inside test");
};
