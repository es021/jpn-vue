
import { NAVI_ROOT } from './navi-helper';

export function _GET(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    var toRet = null;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            toRet = sParameterName[1] === undefined ? true : sParameterName[1];
            break;
        }
    }

    if (sParam == "page" && toRet == null) {
        toRet = NAVI_ROOT;
    }

    return toRet;
}

String.prototype.replaceAll = function (search, replace) {
    return this.replace(new RegExp(search, 'g'), replace);
}

//#########################################################
// ---------- Window Popup ------------------------------ 
var windowPopup = null;
const WINDOW_ID = "JPN_WINDOW";
export function openWindowPopup(url) {
    //var myWindow = window.open(url, WINDOW_ID);
    closeWindowPopup();
    var left = document.getElementById("jpn-left-bar").offsetWidth;
    var width = document.getElementById("jpn-content").clientWidth - left;
    var top = 100;
    var height = window.innerHeight;
    windowPopup = window.open(
        url,
        "_blank",
        `toolbar=no,scrollbars=yes,resizable=no,top=${top},left=${left},width=${width},height=${height}`,
        true
    );

    // the following will only work if it's the same domain, else subject to SOP -
    // so in the case of initially opening it with google, this won't work!
    //myWindow.document.location.href = "/example/test.html";
}

export function closeWindowPopup() {
    if (windowPopup !== null) {
        windowPopup.close();
    }
}
