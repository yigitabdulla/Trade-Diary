import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import authRoute from "../server/routes/auth.js"
import tradesRoute from "../server/routes/trades.js"
import usersRoute from "../server/routes/users.js"
import cookieParser from "cookie-parser"

const app =express()
dotenv.config()

const connect = async () => {

try {
    await mongoose.connect(process.env.MONGO)
    console.log("connected to mongoDB")
} catch(error){
    throw error;
}
};
//middleware
app.use(cookieParser());
app.use(express.json())

app.use("/auth" , authRoute)
app.use("/users" , usersRoute)
app.use("/trades" , tradesRoute)

app.use((err,req,res,next)=> {
    const errorStatus = err.errorStatus || 500;
    const errorMessage = err.message || "something went wrong";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack
    })
});

app.listen(8800,()=>{
    connect()
    console.log("connected to backend.")
})
