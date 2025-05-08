import mongoose from 'mongoose';

const TradeSchema = new mongoose.Schema({

    parity:{
        type: String,
        required: true,
    },
    entryPrice:{
        type: Number,
        required: true,
    },

    stopLoss:{
        type: Number,
        required: true,
    },

    takeProfit:{
        type: Number,
        required: true,
    },      
    resultType:{
        type: [String],
        required: true,
    },
    tradeDate:{
        type: Date,
        required: true,
    },
    analysisPhoto:{
        type: [String],
        required: false,
    },
    profitLose:{
        type: Number,
        required: true,
    },
    comment:{
        type: String,
        required: true,
    },
    createdAt:{
        type: Date,
        default: Date.now,
    },
    updatedAt:{
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model("Trade", TradeSchema);
    

