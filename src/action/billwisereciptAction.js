import { urls,headers } from './config'
import axios from "axios";


export const getAllBillwiseReciptAction = async (data) => {
    try {
        var a = await axios.get(urls.mainUrl+urls.getAllBillWiseReceiptHeader,data, { headers });
        return a.data;
    } catch (error) {
        throw error;
    }
   
}

export const postBillWiseReceiptHeaderAction = async (data) => {
    try {
        var a = await axios.post(urls.mainUrl+urls.insertBillWiseReceiptHeader,data, { headers });
        return a.data;
    } catch (error) {
        throw error;
    }
   
}

export const postBillWiseReceiptDetailAction = async (data) => {
    try {
        var a = await axios.post(urls.mainUrl+urls.insertBillWiseReceiptDetail,data, { headers });
        return a.data;
    } catch (error) {
        throw error;
    }
   
}

export const getPericularlBillWiseReceiptDetailAction = async (data) => {
    try {
        var a = await axios.post(urls.mainUrl+urls.getPericularlBillWiseReceiptDetail,data, { headers });
        return a.data;
    } catch (error) {
        throw error;
    }
   
}


export const chequeHeaderAction = async (data) => {
    try {
        var a = await axios.get(urls.mainUrl+urls.chequeHeader,data, { headers });
        return a.data;
    } catch (error) {
        throw error;
    }
   
}

export const postChequeHeaderAction = async (data) => {
    try {
        var a = await axios.post(urls.mainUrl+urls.insertChequeHeader,data, { headers });
        return a.data;
    } catch (error) {
        throw error;
    }
   
}

export const postChequeDetailAction = async (data) => {
    try {
        var a = await axios.post(urls.mainUrl+urls.insertChequeDetail,data, { headers });
        return a.data;
    } catch (error) {
        throw error;
    }
   
}

export const getPericularlChequetDetailAction = async (data) => {
    try {
        var a = await axios.post(urls.mainUrl+urls.getPericularChequedetail,data, { headers });
        return a.data;
    } catch (error) {
        throw error;
    }
   
}