// import axios from 'axios';
// export function axiosGet(url) {
//     return axios.get(url);
// };


// if (typeof XMLHttpRequest === "undefined") {
//     XMLHttpRequest = function () {
//         try { return new ActiveXObject("Msxml2.XMLHTTP.6.0"); }
//         catch (e) { }
//         try { return new ActiveXObject("Msxml2.XMLHTTP.3.0"); }
//         catch (e) { }
//         try { return new ActiveXObject("Microsoft.XMLHTTP"); }
//         catch (e) { }
//         // Microsoft.XMLHTTP points to Msxml2.XMLHTTP and is redundant
//         throw new Error("This browser does not support XMLHttpRequest.");
//     };
// }


function serialize(obj, prefix) {
    var str = [],
        p;
    for (p in obj) {
        if (obj.hasOwnProperty(p)) {
            var k = prefix ? prefix + "[" + p + "]" : p,
                v = obj[p];
            str.push((v !== null && typeof v === "object") ?
                serialize(v, k) :
                encodeURIComponent(k) + "=" + encodeURIComponent(v));
        }
    }
    return str.join("&");
}

export function getRequest(url, success, error) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", url, true);
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            success(xhttp.responseText)
        }
    };
    xhttp.onerror = function (e) {
        error(e);
    };
    xhttp.send();
}

export function postRequest(url, data, success, error) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", url, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                success(xhttp.responseText)
            } else {
                error(xhttp.responseText);
            }
        }
    };
    xhttp.onerror = function (e) {
        error(e);
    };

    xhttp.send(serialize(data));
}

