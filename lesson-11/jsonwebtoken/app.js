import jwt from "jsonwebtoken";
import "dotenv/config";

const {JWT_SECRET} = process.env;

const payload = {
    email: "ridata5701@exoular.com",
};

const token = jwt.sign(payload, JWT_SECRET, {expiresIn: "24h"});
// console.log(token);
const decodeToken = jwt.decode(token);
// console.log(decodeToken)

try {
    const {email} = jwt.verify(token, JWT_SECRET);
    // console.log(email);
    const invalidToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJpZGF0YTU3MDFAZXhvdWxhci5jb20iLCJpYXQiOjE3MzE5NTUyOTQsImV4cCI6MTczMjA0MTY5NH0.1gABA8g1pDWCVKmqO18GaUrFrrKAUPOy4WGtxTVqdXK";
    jwt.verify(invalidToken, JWT_SECRET);
}
catch(error) {
    console.log(error.message);
}