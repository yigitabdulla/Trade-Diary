import appConfig from "../../configs/app.config";
import { TradeCreateDto, TradeUpdateDto } from "../../configs/types";
import apiRequest from "../apiRequest";

const addTrade = async (trade: TradeCreateDto) => {
    try {
        return await apiRequest.post(appConfig.tradesEndpoint + '/add', trade);

    } catch (error) {
        console.error(error);
    }
}

const deleteTrade = async (id: string) => {
    try {
        return await apiRequest.delete(appConfig.tradesEndpoint + '/delete/:' + id);

    } catch (error) {
        console.error(error);
    }
}

const updateTrade = async (trade: TradeUpdateDto) => {
    try {
        return await apiRequest.put(appConfig.tradesEndpoint + '/update', trade);

    } catch (error) {
        console.error(error);
    }
}

const getTrades = async () => {
    try {
        return await apiRequest.get(appConfig.tradesEndpoint + '/get');

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
