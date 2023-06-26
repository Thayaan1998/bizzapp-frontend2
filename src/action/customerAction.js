
import { urls,headers } from './config'
import axios from "axios";

export const getCustomersAction = async () => {
    try {
        var a = await axios.get(urls.mainUrl+urls.getCustomerUrl, { headers });
        return a.data;
    } catch (error) {
        throw error;
    }
   
}

export const postCustomersAction = async (data) => {
    try {
        var a = await axios.post(urls.mainUrl+urls.addCustomer,data, { headers });
        return a.data;
    } catch (error) {
        throw error;
    }
   
}

export const updateCustomersAction = async (data) => {
    try {
        var a = await axios.post(urls.mainUrl+urls.updateCustomer,data, { headers });
        return a.data;
    } catch (error) {
        throw error;
    }
   
}

export const deleteCustomersAction = async (data) => {
    try {
        var a = await axios.post(urls.mainUrl+urls.deleteCustomer,data, { headers });
        return a.data;
    } catch (error) {
        throw error;
    }
   
}

export const getActiveCustomersAction = async () => {
    try {
        var a = await axios.get(urls.mainUrl+urls.getActiveCustomers, { headers });
        return a.data;
    } catch (error) {
        throw error;
    }
   
}


export const getAutoIncrementIdAction = async () => {
    try {
        var a = await axios.get(urls.mainUrl+urls.getAutoIncrementId, { headers });
        return a.data;
    } catch (error) {
        throw error;
    }
   
}