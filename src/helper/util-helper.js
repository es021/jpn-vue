
import {NAVI_ROOT} from './navi-helper';

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