import { AuthHelper } from "./auth-helper";

export function isMenuItem(url) {
    if (url == "MENU_ITEM") {
        return true;
    }

    return false;
}

export function formatUrl(url) {

    if (typeof url === "string") {

        if (url.indexOf["{{PC_ID}}"] >= 0) {
            var pc_id = AuthHelper.getUser()["PC_ID"];
            url = url.replace("{{PC_ID}}", pc_id);
        }

    }

    return url;

}