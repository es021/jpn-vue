const isProd = process.env.NODE_ENV == "production";

//export const AppRoot = isProd ? "https://es021.github.io/jpn-vue/public" : "http://localhost:8081";
export const Domain = isProd ? "http://192.168.0.240:8080" : "http://localhost:8081"
export const AppRoot = isProd ? "http://192.168.0.240:8080/home" : "http://localhost:8081";
export const WebServiceRoot = isProd ? "http://192.168.0.240:8080/webservice" : "http://localhost:8080/webservice";

export const AppPath = {
    Asset: AppRoot + "/asset",
    Dataset: AppRoot + "/dataset"
};

