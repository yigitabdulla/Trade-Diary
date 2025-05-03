import appConfig from "../../configs/app.config";
import { Trade } from "../../configs/types";
import apiRequest from "../apiRequest";

const addTrade = async (trade: Trade) => {
    try {
        return apiRequest.post(appConfig.tradesEndpoint + '/add', trade);

    } catch (error) {
        console.error(error);
    }
}

const deleteTrade = async (id: string) => {
    try {
        return apiRequest.delete(appConfig.tradesEndpoint + '/delete/' + id);

    } catch (error) {
        console.error(error);
    }
}

const updateTrade = async (trade: Trade) => {
    try {
        return apiRequest.put(appConfig.tradesEndpoint + '/update', trade);

    } catch (error) {
        console.error(error);
    }
}

const getTrades = async () => {
    try {
        return apiRequest.get(appConfig.tradesEndpoint + '/get');

    } catch (error) {
        console.error(error);
    }
}

export default {
    addTrade,
    deleteTrade,
    updateTrade,
    getTrades
}
