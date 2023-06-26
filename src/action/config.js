export const urls={
    mainUrl:"http://bizzpay-backend-f2facb358a61.herokuapp.com/api",
    // mainUrl:"http://localhost:5000/api",
    getCustomerUrl:"/getCustomers",
    addCustomer:"/postCustomer",
    updateCustomer:"/updateCustomer",
    deleteCustomer:"/deleteCustomer",
    getAutoIncrementId:"/getAutoIncrementId",
    

    getAllMasterCofigarations:"/getAllMasterCofigarations",
    addMasterConfigaration:"/postMasterConfigaration",
    updateMasterConfigaration:"/updateMasterConfigartion",
    deleteMasterConfigartion:"/deleteMasterConfigartion",

    getSales:"/getSales",
    getActiveCustomers:"/getActiveCustomers",
    getSalesPerson:"/getSalesPerson",
    insertSales:"/insertSales",
    deleteSales:"/deleteSales",
    updateSales:"/updateSales",
    insertImportSales: "/insertImportSales",

    getSalesOutstandingbyCustomerCode:"/getSalesOutstandingbyCustomerCode",
    updateSalesOutstanding:"/updateSalesOutstanding",
    getBanks:"/getBanks",
    getPaymentType:"/getPaymentType",
    getAreaCodes:"/getAreaCodes",

    
    getAllBillWiseReceiptHeader:"/getAllBillWiseReceiptHeader",
    insertBillWiseReceiptHeader:"/insertBillWiseReceiptHeader",
    insertBillWiseReceiptDetail:"/insertBillWiseReceiptDetail",
    getPericularlBillWiseReceiptDetail:"/getPericularlBillWiseReceiptDetail",


    chequeHeader:"/chequeHeader",
    insertChequeHeader:"/insertChequeHeader",
    insertChequeDetail:"/insertChequeDetail",
    getPericularChequedetail:"/getPericularChequedetail"



}

export const headers = {
    'Content-Type': 'application/json'
};