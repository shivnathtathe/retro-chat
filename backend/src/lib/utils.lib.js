import jwt from "jsonwebtoken";

export const generateJWTToken = (userId,res) => {

    const secretKey = process.env.JWT_TOKEN_SECRET_KEY;
    const jwtToken = jwt.sign({userId},secretKey,{
        expiresIn:"7d"
    })

    res.cookie("jwtToken",jwtToken,{
        maxAge: 7 * 24 * 60 * 60 * 1000 ,
        httpOnly: true, //Prevent XSS attack.
        sameSite:"strict", //Prevent CSRF
        secure: process.env.NODE_ENV !== "development"
    });

    return jwtToken
}