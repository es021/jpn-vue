const isProd = process.env.NODE_ENV == "production";

// server --> "http://192.168.0.240:8080" 
// aidy --> "http://192.168.0.141:8080" 
export const WASPUrl = "";
export const Domain = isProd ? location.origin : "http://localhost:8081"
export const AppRoot = isProd ? `${Domain}/home` : Domain;
export const WebServiceRoot = isProd ? `${Domain}/home-webservice` : "http://localhost:8080/home-webservice";

export const AppPath = {
    Asset: AppRoot + "/asset",
    Dataset: AppRoot + "/dataset"
};

export const STORE_AUTH = "JPN-LOCAL-STORAGE-AUTH";
export const STORE_NAVI = "JPN-LOCAL-STORAGE-NAVI";