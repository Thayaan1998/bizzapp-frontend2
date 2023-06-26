import { urls,headers } from './config'
import axios from "axios";


export const getAllMasterCofigarationsActions= async () => {
    try {
        var a = await axios.get(urls.mainUrl+urls.getAllMasterCofigarations, { headers });
        return a.data;
    } catch (error) {
        throw error;
    }
}

export const postMasterConfigarationAction = async (data) => {
    try {
        var a = await axios.post(urls.mainUrl+urls.addMasterConfigaration,data, { headers });
        return a.data;
    } catch (error) {
        throw error;
    }
   
}


export const updateMasterConfigarationAction = async (data) => {
    try {
        var a = await axios.post(urls.mainUrl+urls.updateMasterConfigaration,data, { headers });
        return a.data;
    } catch (error) {
        throw error;
    }
   
}

export const deleteMasterConfigartionAction = async (data) => {
    try {
        var a = await axios.post(urls.mainUrl+urls.deleteMasterConfigartion,data, { headers });
        return a.data;
    } catch (error) {
        throw error;
    }
   
}

export const getActivMasterConfigartionAction = async () => {
    try {
        var a = await axios.get(urls.mainUrl+urls.getSalesPerson, { headers });
        return a.data;
    } catch (error) {
        throw error;
    }
   
}

export const getPaymentTypeAction = async () => {
    try {
        var a = await axios.get(urls.mainUrl+urls.getPaymentType, { headers });
        return a.data;
    } catch (error) {
        throw error;
    }
   
}


export const getBanksAction = async () => {
    try {
        var a = await axios.get(urls.mainUrl+urls.getBanks, { headers });
        return a.data;
    } catch (error) {
        throw error;
    }
   
}

export const getAreaCodesAction = async () => {
    try {
        var a = await axios.get(urls.mainUrl+urls.getAreaCodes, { headers });
        return a.data;
    } catch (error) {
        throw error;
    }
   
}