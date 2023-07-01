export const urls={
    mainUrl:"https://bizzpay-backend-f2facb358a61.herokuapp.com/api",
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
    getDateByWithoutRangeSales:"/getDateByWithoutRangeSales",

    getSalesOutstandingbyCustomerCode:"/getSalesOutstandingbyCustomerCode",
    getSalesOutstandingbyCustomerCode1:"/getSalesOutstandingbyCustomerCode1",
    updateSalesOutstanding:"/updateSalesOutstanding",
    getBanks:"/getBanks",
    getPaymentType:"/getPaymentType",
    getAreaCodes:"/getAreaCodes",
    getDetailOutstanding:"/getDetailOutstanding",

    
    getAllBillWiseReceiptHeader:"/getAllBillWiseReceiptHeader",
    insertBillWiseReceiptHeader:"/insertBillWiseReceiptHeader",
    insertBillWiseReceiptDetail:"/insertBillWiseReceiptDetail",
    getPericularlBillWiseReceiptDetail:"/getPericularlBillWiseReceiptDetail",
    getBillWiseReciptWithDateRange:"/getBillWiseReciptWithDateRange",


    chequeHeader:"/chequeHeader",
    insertChequeHeader:"/insertChequeHeader",
    insertChequeDetail:"/insertChequeDetail",
    getPericularChequedetail:"/getPericularChequedetail"



}

export const headers = {
    'Content-Type': 'application/json'
};