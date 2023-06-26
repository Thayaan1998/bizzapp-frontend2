import { urls,headers } from './config'
import axios from "axios";


export const getSalesAction = async () => {
    try {
        var a = await axios.get(urls.mainUrl+urls.getSales, { headers });
        return a.data;
    } catch (error) {
        throw error;
    }
   
}

export const insertSales = async (data) => {
    debugger
    try {
        var a = await axios.post(urls.mainUrl+urls.insertSales,data, { headers });
        return a.data;
    } catch (error) {
        throw error;
    }
   
}

export const updateSalesAction = async (data) => {
    try {
        var a = await axios.post(urls.mainUrl+urls.updateSales,data, { headers });
        return a.data;
    } catch (error) {
        throw error;
    }
   
}

export const deleteSalesAction = async (data) => {
    try {
        var a = await axios.post(urls.mainUrl+urls.deleteSales,data, { headers });
        return a.data;
    } catch (error) {
        throw error;
    }
   
}

export const insertImportSales = async (data) => {
    try {
        var a = await axios.post(urls.mainUrl+urls.insertImportSales,data, { headers });
        return a.data;
    } catch (error) {
        throw error;
    }
   
}