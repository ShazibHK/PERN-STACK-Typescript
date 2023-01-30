import express from "express";
import bodyParser from "body-parser"
import { check } from "express-validator"
import { signup,signin,refreshToken} from "../controller/customerController"


const router = express.Router();
const urlencodedBodyParser = express.urlencoded({ extended: true })
    router.post("/signup", urlencodedBodyParser,
    [
        check('email', 'Email is not valid').isEmail().normalizeEmail(),
        check('password', 'This password must me 3+ characters long').exists().isLength({ min: 3 })
    ],
    signup);

    router.post("/signin", urlencodedBodyParser,
    [
        check('email', 'Email is not valid').isEmail().normalizeEmail(),
        check('password', 'This password must me 3+ characters long').exists().isLength({ min: 3 })
    ],
    signin);

    router.post('/refreshToken',refreshToken);
    
export default router;