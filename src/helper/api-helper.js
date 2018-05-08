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

export function getRequest(url, success, error) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            success(xhttp.responseText)
        } else {
            console.log(url, "error 1");
            error(xhttp);
        }
    };
    xhttp.open("GET", url, true);
    xhttp.onerror = function (e) {
        console.log(url, "error 2");
        error(e);
    };
    xhttp.send();
}
