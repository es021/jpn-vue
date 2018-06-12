import { postRequest } from "./api-helper";
import { WebServiceRoot, STORE_AUTH, STORE_ADMIN } from "../config/app-config";
import { getUnixTimestampNow } from "./time-helper";

const KEY = STORE_AUTH;

/*
authenticated: false,
login_time: unixtimestamp
user: null,
err: "[Server Error] " + err
*/

var STORE = {};

function initStorage() {
    STORE = localStorage.getItem(KEY);
    if (STORE !== null) {
        try {
            STORE = JSON.parse(STORE);
        } catch (err) {
            resetStorage();
        }
    } else {
        resetStorage();
    }
}

function resetStorage() {
    STORE = {};
    localStorage.setItem(KEY, "{}");
}

initStorage();

// #######################################################
// Auth helper class
export const AuthErr = {
    INVALID_USER: "INVALID_USER",
    WRONG_PASSWORD: "WRONG_PASSWORD",
    INVALID_MACHINE_NO: "INVALID_MACHINE_NO",
    NO_NEW_VERSION: "ERR_NO_NEW_VERSION"
};

export const AuthHelper = {
    loginWithUser(user_id, pc_id, cb) {
        cb = arguments[arguments.length - 1];
        if (this.loggedIn()) {
            if (cb) cb(this.getStore());
            return;
        }

        loginRequestUser(user_id, pc_id, (res) => {
            if (res.authenticated) {
                localStorage.setItem(KEY, JSON.stringify(res));
            }

            // reinitialize storage
            initStorage();

            if (cb) cb(res);
        })
    },
    /*
    loginWithMachineNo(machine_no, cb) {
        cb = arguments[arguments.length - 1];
        if (this.loggedIn()) {
            if (cb) cb(STORE);
            return;
        }

        loginRequestMachineNo(machine_no, (res) => {
            if (res.authenticated) {
                localStorage.setItem(KEY, JSON.stringify(res));
            }

            // reinitialize storage
            initStorage();

            if (cb) cb(res);
        })
    },
    login(email, pass, cb) {
        cb = arguments[arguments.length - 1];
        if (this.loggedIn()) {
            if (cb) cb(STORE);
            return;
        }

        loginRequest(email, pass, (res) => {
            if (res.authenticated) {
                localStorage.setItem(KEY, JSON.stringify(res));
            }

            // reinitialize storage
            initStorage();

            if (cb) cb(res);
        })
    },
    */
    getStore() {
        try {
            return JSON.parse(localStorage.getItem(KEY));
        } catch (err) {
            console.log("error in getStore", err);
            return {};
        }
    },
    getUser() {
        var user = this.getStore().user;
        if (typeof user === "undefined") {
            return {};
        } else {
            return user;
        }
    },
    logout(cb, makeRequest) {
        makeRequest = (typeof makeRequest === "undefined") ? true : makeRequest;

        if (makeRequest) {
            var user = this.getUser();
            if (typeof user !== "undefined") {
                logoutRequest(user["OPER_ID"]);
            }
        }

        // remove user local storage
        localStorage.removeItem(KEY);
        localStorage.removeItem(STORE_ADMIN);

        // reinitialize storage
        initStorage();

        if (cb) cb();
    },
    isSessionExpired(store) {
        if (typeof store === "undefined") {
            store = this.getStore();
        }

        // session will expired after 16 hour from login time
        var LIMIT_HOUR = 10;
        var LIMIT_UNIX = LIMIT_HOUR * 60 * 60;
        //console.log("checking isSessionExpired", store.login_time + LIMIT_UNIX, getUnixTimestampNow());

        // if last login time plus session limit hour is less than current time
        // then session already expired
        if (store.login_time + LIMIT_UNIX < getUnixTimestampNow()) {
            console.log("Session Expired");
            return true;
        }

        return false;
    },
    loggedIn(goToExit) {
        var store = this.getStore();
        var authed = false;

        if (store.authenticated) {
            authed = true;

            // make request to db to check if 
            // login time in DB is same stored in local
            checkLoginTimeRequest(store.user["OPER_ID"], res => {
                try {
                    res = JSON.parse(res);
                    var login_time = res.data[0]["LOGIN_TIME"];

                    //console.log("local", store.login_time);
                    //console.log("db", login_time);

                    // if overrided by another PC no need to make logout request to server
                    if (store.login_time != login_time) {
                        this.logout(goToExit, false);
                    }
                    // if okay check if session expired
                    else if (this.isSessionExpired(store)) {
                        this.logout(goToExit);
                    }

                } catch (err) {
                    console.log("err parse");
                    this.logout(goToExit);
                }
            });

        }

        return authed;
    },
}

// #######################################################
// login request 

function checkLoginTimeRequest(user_id, success) {
    postRequest(`${WebServiceRoot}/auth/loginTime`, { user_id: user_id },
        function (res) {
            success(res);
            //console.log("checkLoginTimeRequest res", res);
        }, function (err) {
            console.log("checkLoginTimeRequest err", err);
        });
}

function logoutRequest(user_id) {
    console.log("make logout request");
    postRequest(`${WebServiceRoot}/auth/logout`, { user_id: user_id },
        function (res) {
            console.log("logout res", res);
        }, function (err) {
            console.log("logout err", err);
        });
}

function loginRequestUser(user_id, pc_id, cb) {
    postRequest(`${WebServiceRoot}/auth/loginWithUser`, { user_id: user_id, pc_id: pc_id },
        function (res) {

            loginRequestSuccess(res, cb);
        }, function (err) {
            loginRequestError(err, cb);
        });
}

function reformatOperLevel(user) {
    // parse user oper level
    for (var k in user) {
        if (k.indexOf("OPER_LVL") >= 0) {
            var bin = user[k].toString(2);
            if (bin.length > 0 && typeof bin !== "undefined") {
                while (bin.length < 8) {
                    bin = "0" + bin;
                }
                user[k] = bin;
            }
        }
    }

    return user;
}

function loginRequestSuccess(res, cb) {
    var authenticated = false;
    var err = "";
    var user = null;

    try {
        res = JSON.parse(res);
        user = res.data[0];

        if (res.err == "" || typeof res.err == "undefined" || res.err == null) {
            authenticated = true;
            user = reformatOperLevel(user);
        }

        // custom error from webservice
        err = res.err;
    } catch (errCatch) {
        // parsing error
        err = errCatch;
    }

    var data = {
        //login_time: getUnixTimestampNow(),
        login_time: user ? user["LOGIN_TIME"] : 0,
        authenticated: authenticated,
        user: user,
        err: err,
    };

    cb(data)
}

function loginRequestError(err, cb) {
    console.log(err);
    if (typeof err !== "string") {
        err = "Failed to connect to server";
    }
    var data = {
        authenticated: false,
        user: null,
        err: "[Server Error] " + err
    };
    cb(data);
}

const ADMIN_HASH = "37e4392dad1ad3d86680a8c6b06ede92";
export function authenticateAdmin(password) {
    var MD5 = function (s) { function L(k, d) { return (k << d) | (k >>> (32 - d)) } function K(G, k) { var I, d, F, H, x; F = (G & 2147483648); H = (k & 2147483648); I = (G & 1073741824); d = (k & 1073741824); x = (G & 1073741823) + (k & 1073741823); if (I & d) { return (x ^ 2147483648 ^ F ^ H) } if (I | d) { if (x & 1073741824) { return (x ^ 3221225472 ^ F ^ H) } else { return (x ^ 1073741824 ^ F ^ H) } } else { return (x ^ F ^ H) } } function r(d, F, k) { return (d & F) | ((~d) & k) } function q(d, F, k) { return (d & k) | (F & (~k)) } function p(d, F, k) { return (d ^ F ^ k) } function n(d, F, k) { return (F ^ (d | (~k))) } function u(G, F, aa, Z, k, H, I) { G = K(G, K(K(r(F, aa, Z), k), I)); return K(L(G, H), F) } function f(G, F, aa, Z, k, H, I) { G = K(G, K(K(q(F, aa, Z), k), I)); return K(L(G, H), F) } function D(G, F, aa, Z, k, H, I) { G = K(G, K(K(p(F, aa, Z), k), I)); return K(L(G, H), F) } function t(G, F, aa, Z, k, H, I) { G = K(G, K(K(n(F, aa, Z), k), I)); return K(L(G, H), F) } function e(G) { var Z; var F = G.length; var x = F + 8; var k = (x - (x % 64)) / 64; var I = (k + 1) * 16; var aa = Array(I - 1); var d = 0; var H = 0; while (H < F) { Z = (H - (H % 4)) / 4; d = (H % 4) * 8; aa[Z] = (aa[Z] | (G.charCodeAt(H) << d)); H++ } Z = (H - (H % 4)) / 4; d = (H % 4) * 8; aa[Z] = aa[Z] | (128 << d); aa[I - 2] = F << 3; aa[I - 1] = F >>> 29; return aa } function B(x) { var k = "", F = "", G, d; for (d = 0; d <= 3; d++) { G = (x >>> (d * 8)) & 255; F = "0" + G.toString(16); k = k + F.substr(F.length - 2, 2) } return k } function J(k) { k = k.replace(/rn/g, "n"); var d = ""; for (var F = 0; F < k.length; F++) { var x = k.charCodeAt(F); if (x < 128) { d += String.fromCharCode(x) } else { if ((x > 127) && (x < 2048)) { d += String.fromCharCode((x >> 6) | 192); d += String.fromCharCode((x & 63) | 128) } else { d += String.fromCharCode((x >> 12) | 224); d += String.fromCharCode(((x >> 6) & 63) | 128); d += String.fromCharCode((x & 63) | 128) } } } return d } var C = Array(); var P, h, E, v, g, Y, X, W, V; var S = 7, Q = 12, N = 17, M = 22; var A = 5, z = 9, y = 14, w = 20; var o = 4, m = 11, l = 16, j = 23; var U = 6, T = 10, R = 15, O = 21; s = J(s); C = e(s); Y = 1732584193; X = 4023233417; W = 2562383102; V = 271733878; for (P = 0; P < C.length; P += 16) { h = Y; E = X; v = W; g = V; Y = u(Y, X, W, V, C[P + 0], S, 3614090360); V = u(V, Y, X, W, C[P + 1], Q, 3905402710); W = u(W, V, Y, X, C[P + 2], N, 606105819); X = u(X, W, V, Y, C[P + 3], M, 3250441966); Y = u(Y, X, W, V, C[P + 4], S, 4118548399); V = u(V, Y, X, W, C[P + 5], Q, 1200080426); W = u(W, V, Y, X, C[P + 6], N, 2821735955); X = u(X, W, V, Y, C[P + 7], M, 4249261313); Y = u(Y, X, W, V, C[P + 8], S, 1770035416); V = u(V, Y, X, W, C[P + 9], Q, 2336552879); W = u(W, V, Y, X, C[P + 10], N, 4294925233); X = u(X, W, V, Y, C[P + 11], M, 2304563134); Y = u(Y, X, W, V, C[P + 12], S, 1804603682); V = u(V, Y, X, W, C[P + 13], Q, 4254626195); W = u(W, V, Y, X, C[P + 14], N, 2792965006); X = u(X, W, V, Y, C[P + 15], M, 1236535329); Y = f(Y, X, W, V, C[P + 1], A, 4129170786); V = f(V, Y, X, W, C[P + 6], z, 3225465664); W = f(W, V, Y, X, C[P + 11], y, 643717713); X = f(X, W, V, Y, C[P + 0], w, 3921069994); Y = f(Y, X, W, V, C[P + 5], A, 3593408605); V = f(V, Y, X, W, C[P + 10], z, 38016083); W = f(W, V, Y, X, C[P + 15], y, 3634488961); X = f(X, W, V, Y, C[P + 4], w, 3889429448); Y = f(Y, X, W, V, C[P + 9], A, 568446438); V = f(V, Y, X, W, C[P + 14], z, 3275163606); W = f(W, V, Y, X, C[P + 3], y, 4107603335); X = f(X, W, V, Y, C[P + 8], w, 1163531501); Y = f(Y, X, W, V, C[P + 13], A, 2850285829); V = f(V, Y, X, W, C[P + 2], z, 4243563512); W = f(W, V, Y, X, C[P + 7], y, 1735328473); X = f(X, W, V, Y, C[P + 12], w, 2368359562); Y = D(Y, X, W, V, C[P + 5], o, 4294588738); V = D(V, Y, X, W, C[P + 8], m, 2272392833); W = D(W, V, Y, X, C[P + 11], l, 1839030562); X = D(X, W, V, Y, C[P + 14], j, 4259657740); Y = D(Y, X, W, V, C[P + 1], o, 2763975236); V = D(V, Y, X, W, C[P + 4], m, 1272893353); W = D(W, V, Y, X, C[P + 7], l, 4139469664); X = D(X, W, V, Y, C[P + 10], j, 3200236656); Y = D(Y, X, W, V, C[P + 13], o, 681279174); V = D(V, Y, X, W, C[P + 0], m, 3936430074); W = D(W, V, Y, X, C[P + 3], l, 3572445317); X = D(X, W, V, Y, C[P + 6], j, 76029189); Y = D(Y, X, W, V, C[P + 9], o, 3654602809); V = D(V, Y, X, W, C[P + 12], m, 3873151461); W = D(W, V, Y, X, C[P + 15], l, 530742520); X = D(X, W, V, Y, C[P + 2], j, 3299628645); Y = t(Y, X, W, V, C[P + 0], U, 4096336452); V = t(V, Y, X, W, C[P + 7], T, 1126891415); W = t(W, V, Y, X, C[P + 14], R, 2878612391); X = t(X, W, V, Y, C[P + 5], O, 4237533241); Y = t(Y, X, W, V, C[P + 12], U, 1700485571); V = t(V, Y, X, W, C[P + 3], T, 2399980690); W = t(W, V, Y, X, C[P + 10], R, 4293915773); X = t(X, W, V, Y, C[P + 1], O, 2240044497); Y = t(Y, X, W, V, C[P + 8], U, 1873313359); V = t(V, Y, X, W, C[P + 15], T, 4264355552); W = t(W, V, Y, X, C[P + 6], R, 2734768916); X = t(X, W, V, Y, C[P + 13], O, 1309151649); Y = t(Y, X, W, V, C[P + 4], U, 4149444226); V = t(V, Y, X, W, C[P + 11], T, 3174756917); W = t(W, V, Y, X, C[P + 2], R, 718787259); X = t(X, W, V, Y, C[P + 9], O, 3951481745); Y = K(Y, h); X = K(X, E); W = K(W, v); V = K(V, g) } var i = B(Y) + B(X) + B(W) + B(V); return i.toLowerCase() };
    var hashed = MD5(password);
    return hashed == ADMIN_HASH;
}

/*

function loginRequestMachineNo(machine_no, cb) {
    console.log(machine_no);
    // convert machine no hexadecimal
    var temp_machine_no = Number.parseInt(machine_no);
    console.log(Number.isNaN(machine_no));
    if (Number.isNaN(temp_machine_no)) {
        var data = {
            authenticated: false,
            user: null,
            err: `Invalid Machine No Given : ${machine_no}`
        };

        cb(data)
        return;
    }

    machine_no = temp_machine_no.toString(16);
    console.log("here",machine_no);

    postRequest(`${WebServiceRoot}/rest/auth/loginWithMachine`, { machine_no: machine_no },
        function (res) {
            loginRequestSuccess(res, cb);
        }, function (err) {
            loginRequestError(err, cb);
        });
}
*/

/*
function loginRequest(email, pass, cb) {
    postRequest(`${WebServiceRoot}/rest/auth/login`, { username: email, password: pass },
       function (res) {
            loginRequestSuccess(res, cb);
        }, function (err) {
            loginRequestError(err, cb);
        });
}
*/