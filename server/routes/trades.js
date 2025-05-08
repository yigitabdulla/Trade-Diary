import express from "express";
import Trade from "../models/Trade.js"
import { createError } from "../utils/error.js";
import {createTrade, deleteTrade, getAllTrade, getTradeById, updateTrade} from "../controllers/tradeController.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

//CREATE
router.post("/" , verifyUser,createTrade);
//UPDATE
router.put("/:id" ,verifyUser, updateTrade);
//DELETE
router.delete("/:id", verifyUser,deleteTrade);
//GET
router.get("/:id", verifyUser,getTradeById);
//GET ALL   
router.get("/", verifyAdmin ,getAllTrade);

export default router;
