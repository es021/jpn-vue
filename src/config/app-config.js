const isProd = process.env.NODE_ENV == "production";

export const AppRoot = isProd ? "https://es021.github.io/jpn-vue" : "http://localhost/jpn-vue/public";
export const AppPath = {
    Asset: AppRoot + "/asset",
    Dataset: AppRoot + "/dataset"
};

