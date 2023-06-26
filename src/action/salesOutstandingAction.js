import { urls,headers } from './config'
import axios from "axios";


export const getSalesOutstandingbyCustomerCodeAction = async (data) => {
    try {
        var a = await axios.post(urls.mainUrl+urls.getSalesOutstandingbyCustomerCode,data, { headers });
        return a.data;
    } catch (error) {
        throw error;
    }
   
}

export const updateSalesOutstandingAction = async (data) => {
    try {
        var a = await axios.post(urls.mainUrl+urls.updateSalesOutstanding,data, { headers });
        return a.data;
    } catch (error) {
        throw error;
    }
   
}

