import jwt from "jsonwebtoken";
import { createError } from "./error.js";  
import dotenv from "dotenv"

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        return next(createError(401, "You are not authenticated!"));
    }

    jwt.verify(token, process.env.JWT, (err, user) => {
        if (err) return next(createError(403, "Token is not valid!"));
        req.user = user;
        console.log("token worked",user.id) 
        next();
    })
}

export const verifyUser = (req, res, next) => {
    verifyToken(req, res,  () => {
        console.log("user worked",req.user.id,req.params.id)
        if(req.params.id === req.user.id || req.user.isAdmin ){
            next();
        }else{
            return next(createError(403, "You are not authorized!"));
        }
        });
    };
export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        console.log("admin worked")
        if(req.user.isAdmin ){
            
            next();
        }else{
            return next(createError(403, "You are not authorized!"));
        }
        });
    };
    