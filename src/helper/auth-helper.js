import { postRequest } from "./api-helper";
import { WebServiceRoot, STORE_AUTH } from "../config/app-config";
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
            if (cb) cb(STORE);
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
    logout(cb) {
        //var user = this.getUser();
        //if (typeof user !== "undefined") {
        //logoutRequest(user["OPER_ID"]);
        //}

        // remove user local storage
        localStorage.removeItem(KEY);

        // reinitialize storage
        initStorage();

        if (cb) cb();
    },
    isSessionExpired() {
        // session will expired after 16 hour from login time
        var LIMIT_HOUR = 16;
        var LIMIT_UNIX = LIMIT_HOUR * 60 * 60;
        //console.log("checking isSessionExpired", STORE.login_time + LIMIT_UNIX, getUnixTimestampNow());

        // if last login time plus session limit hour is less than current time
        // then session already expired
        if (STORE.login_time + LIMIT_UNIX < getUnixTimestampNow()) {
            console.log("dh tamat");
            return true;
        }

        return false;
    },
    loggedIn() {
        if (STORE.authenticated) {
            return true;
        }
        return false;
    },
}

// #######################################################
// login request 

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
        }

        user = reformatOperLevel(user);

        // custom error from webservice
        err = res.err;
    } catch (errCatch) {
        // parsing error
        err = errCatch;
    }

    var data = {
        login_time: getUnixTimestampNow(),
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