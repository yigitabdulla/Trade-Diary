import  Trade  from "../models/Trade.js";

export const createTrade =async (req,res,next) => {

        const newTrade = new Trade(req.body)
        try {
            const savedTrade = await newTrade.save();
            res.status(200).json(savedTrade);
        } catch (error) {
            next(error);
        };
}
export const updateTrade =async (req,res,next) => {

    try {
            const updatedTrade = await Trade.findByIdAndUpdate(
                req.params.id,
                {$set: req.body},
                {new: true}
            );
            res.status(200).json(updatedTrade);
        } catch (error) {
        next(error);
    };
}
export const deleteTrade =async (req,res,next) => {

    try{
            await Trade.findByIdAndDelete(req.params.id);
            res.status(200).json("Trade has been deleted");
            } catch (error) {
        next(error);
    };
}
export const getTradeById =async (req,res,next) => {

    try{
            const trade = await Trade.findById(req.params.id);
            res.status(200).json(trade);
        } catch (error) {
        next(error);
    };
}
export const getAllTrade =async (req,res,next) => {

        try{
            const trades = await Trade.find();
            res.status(200).json(trades);
        } catch (error) {
        next(error);
    };
}