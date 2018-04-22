const isProd = process.env.NODE_ENV == "production";

export const AppRoot = isProd ? "https://es021.github.io/jpn-vue/public" : "http://localhost:8081";
export const AppPath = {
    Asset: AppRoot + "/asset",
    Dataset: AppRoot + "/dataset"
};

