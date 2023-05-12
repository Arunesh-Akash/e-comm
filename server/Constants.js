module.exports = class Constants {
    static SIGNUP_REQUEST = {
        NAME: "name",
        EMAIL: "email",
        MOBILE_NO: "mobile_no",
        DATEOFBIRTH: "date_of_birth",
        PASSWORD: "password"
    }

    static LOG_REQUEST = {
        EMAIL: "email",
        PASSWORD: "password"
    }

    static CART_DATA = {
        PRODUCTNAME: "productName",
        TYPE: "type",
        PRICE: "price"
    }

    static PRODUCT_DATA = {
        PRODUCTNAME: "productName",
        DESC: "desc",
        PRICE: "price",
        RATING: "rating"
    }

    static PAYMENT_DATA = {
        USERNAME: "userName",
        CARDNO: "cardNo",
        VALID: "valid",
        CVV: "cvv"
    }

    static SECRET_KEY = "akash123";
    static ID = "_id";
    static LOCAL_URL = "mongodb://127.0.0.1/e-comm";
}