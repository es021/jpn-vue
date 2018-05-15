
const KEY = "JPN-LOCAL-STORAGE-AUTH";
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
    INVALID_MACHINE_NO: "INVALID_MACHINE_NO"
};

export const AuthHelper = {
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

    getStore() {
        try {
            return JSON.parse(localStorage.getItem(KEY));
        } catch (err) {
            console.log("error in getStore", err);
            return {};
        }
    },
    getUser() {
        return this.getStore().user;
    },
    logout(cb) {
        localStorage.removeItem(KEY);

        // reinitialize storage
        initStorage();
        if (cb) cb();
    },

    loggedIn() {
        //console.log("STORE", STORE);

        if (STORE.authenticated) {
            return true;
        }
        return false;
    },
}

// #######################################################
// login request 
import { postRequest } from "./api-helper";
import { WebServiceRoot } from "../config/app-config";

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

            var authenticated = false;
            var err = "";
            var user = null;

            try {
                res = JSON.parse(res);
                user = res.data[0];

                if (res.err == "" || typeof res.err == "undefined" || res.err == null) {
                    authenticated = true;
                }

                // custom error from webservice
                err = res.err;
            } catch (errCatch) {
                // parsing error
                err = errCatch;
            }

            var data = {
                authenticated: authenticated,
                user: user,
                err: err
            };

            cb(data)

        }, function (err) {
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
        });
}

function loginRequest(email, pass, cb) {
    postRequest(`${WebServiceRoot}/rest/auth/login`, { username: email, password: pass },
        function (res) {

            var authenticated = false;
            var err = "";
            var user = null;

            try {
                res = JSON.parse(res);
                user = res.data[0];

                if (res.err == "" || typeof res.err == "undefined" || res.err == null) {
                    authenticated = true;
                }

                // custom error from webservice
                err = res.err;
            } catch (errCatch) {
                // parsing error
                err = errCatch;
            }

            var data = {
                authenticated: authenticated,
                user: user,
                err: err
            };

            cb(data)

        }, function (err) {
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
        });
}
