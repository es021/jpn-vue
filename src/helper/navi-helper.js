import { AppRoot, WebServiceRoot } from '../config/app-config';
import { postRequest } from './api-helper';
export const NAVI_ROOT = "menu-utama";

import { STORE_NAVI } from "../config/app-config";
import { AuthErr } from "../helper/auth-helper";

// parameter is callback 
// called from app home
export function loadNaviFromDB(success, error, version) {
    if (typeof version === "undefined") {
        version = getNaviCurrentVer();
    }

    // if version is updated, will return error NO_NEW_VERSION
    postRequest(`${WebServiceRoot}/auth/getNavi`, { version: version },
        function (res) {
            try {
                res = JSON.parse(res);
                if (typeof res.err !== "undefined" && res.err != "") {

                    // if no new version just call success
                    // no need to update the local storage
                    if (res.err == AuthErr.NO_NEW_VERSION) {
                        console.log("no new version")
                        success();
                        return;
                    }

                    error(res.err);

                } else {
                    // set to local storage here
                    initNaviLocalStorage(res.data);
                    success(res);
                }
            } catch (err) {
                error(err);
            }
        }, function (err) {
            error(err);
        });
}

function initNaviLocalStorage(dbData, ver) {
    function getChildrenObj(PARENTS, MAP_ID, id) {
        var childsId = PARENTS[id];

        if (typeof childsId === "undefined") {
            return null;
        }
        var toRet = [];
        var IDS = [];
        for (var i in childsId) {
            var ch = childsId[i];

            IDS.push(ch);

            var raw = MAP_ID[ch];
            var obj = {
                id: raw["NAVI_NAME"],
                label: raw["NAVI_LABEL"],
                url: raw["NAVI_URL"],
                url_was: raw["NAVI_URL_WAS"],
                children: []
            }

            toRet.push(obj);
        }

        for (var i in IDS) {
            var rec_id = IDS[i];
            toRet[i]["children"] = getChildrenObj(PARENTS, MAP_ID, rec_id);
        }

        return toRet;
    }

    var MAP = {};

    var MAP_ID = {};
    var PARENTS = {};
    var NO_PARENT = [];

    var VERSION = "";
    for (var i in dbData) {

        var data = dbData[i];

        // if the last object
        // its the version
        if (i == dbData.length - 1) {
            VERSION = data["version"];
            break;
        }

        var id = data["NAVI_NAME"];
        var label = data["NAVI_LABEL"];
        var parent = data["NAVI_PARENT_NAME"];
        var rec_id = data["NAVI_ID"];

        // if (id == "penyelenggaraan-nombor-siri-sijil-pengangkatan") {
        //     console.log(data);
        // }

        MAP[id] = {
            label: label,
            parent: (parent != "") ? parent : null,
            rec_id: rec_id // this is needed to find parent id to map in PARENTS
        };

        if (parent == "") {
            NO_PARENT.push(rec_id);
        }

        MAP_ID[rec_id] = data;

        var navParent = MAP[parent];
        if (typeof navParent !== "undefined") {
            var parent_rec_id = navParent["rec_id"];
            if (typeof PARENTS[parent_rec_id] === "undefined") {
                PARENTS[parent_rec_id] = [];
            }

            PARENTS[parent_rec_id].push(rec_id);
        }

    }

    var NAVI_FINAL = [];
    //console.log(NO_PARENT);

    for (var i in NO_PARENT) {

        var id = NO_PARENT[i];
        var raw = MAP_ID[id];
        //console.log("creating", raw["NAVI_NAME"]);

        var children = getChildrenObj(PARENTS, MAP_ID, id);

        var obj = {
            id: raw["NAVI_NAME"],
            label: raw["NAVI_LABEL"],
            url: raw["NAVI_URL"],
            url_was: raw["NAVI_URL_WAS"],
            isParent: true,
            children: children
        }

        NAVI_FINAL.push(obj);
    }

    var toStore = {
        version: VERSION,
        raw: NAVI_FINAL,
        map: MAP
    };

    localStorage.setItem(STORE_NAVI, JSON.stringify(toStore));
    //console.log("NAVI_FINAL", MAP);
    //console.log("NAVI_FINAL", NAVI_FINAL);
}

function getStoreNavi() {
    try {
        var store = JSON.parse(localStorage.getItem(STORE_NAVI));
        if (store == null || typeof store === "undefined") {
            return {};
        } else {
            return store;
        }
    } catch (err) {
        console.log("getStoreNavi", err);
        return {};
    }
}


export function getNaviCurrentVer() {
    var v = getStoreNavi().version;

    if (typeof v === "undefined") {
        return "";
    }

    return v;
}

export function redirect(vue, url) {
    //console.log("redirect", url);
    vue.$router.replace(url);
}

export function goToHome() {
    window.location = AppRoot;
}
export function getNavigationRaw() {
    return getStoreNavi().raw;
    //return require('../dataset/navigation.json');
}

export function getNavigationMapRaw() {
    return getStoreNavi().map;
    //return require('../dataset/navigation-map.json');
}

export function getCurrentPage(route) {
    var page = route.params.page_id;
    if (typeof page === "undefined") {
        page = NAVI_ROOT;
    }
    return page;
}

export function getParents(curId) {
    var map = getNavigationMapRaw();
    var parents = [];
    var curParent = null;
    do {
        var curNavi = map[curId];
        if (curNavi) {
            curParent = map[curId].parent;
            if (curParent != null) {
                parents.unshift(curParent);
            }
        }
        curId = curParent;
    } while (curParent != null);

    return parents;
}


export function getNavigation(parentList = [], navi = null, level = 0) {

    // init
    if (navi === null && level === 0) {
        navi = getNavigationRaw();
    }

    if (level == parentList.length) {
        return navi;
    }

    var curParent = parentList[level];

    for (var i in navi) {
        var parent = navi[i];
        if (parent.id == curParent) {
            return getNavigation(parentList, parent.children, level + 1);
        }
    }
}

export function getNavigationSiblings(id) {
    var parents = getParents(id);
    return getNavigation(parents);
}

export function getNavigationById(id) {
    if (id == NAVI_ROOT) {
        return {
            label: "Menu Utama",
            children: getNavigation()
        };
    }

    // var debug = id == "pendaftaran-pengangkatan-mahkamah";

    // if (debug) {
    //     return {};
    // }

    var siblings = getNavigationSiblings(id);
    for (var i in siblings) {
        if (siblings[i].id == id) {
            return siblings[i];
        }
    }
}

export function getNaviInternalUrl(d) {
    var r = "";
    // if (d.url && d.url !== null && d.url !== "") {
    //     r = d.url;
    // } else {
    //     r = `${AppRoot}/?page=${d.id}`;
    // }

    r = `/page/${d.id}`;

    //r = "http://localhost:8080/JPN/COOP.T3861501.TC.html";

    return r;
}


// this only to be saved in file
export function getMapNavi() {
    var master = {};
    function getMapObj(n, parent) {
        return {
            label: n.label,
            parent: parent
        }
    }

    function allDescendants(node, parent = null) {
        if (!Array.isArray(node)) {
            node = [node];
        }
        for (var i in node) {
            var n = node[i];
            master[n.id] = getMapObj(n, parent);
            if (n.children != null) {
                //parents.push(n.id);
                for (var j in n.children) {
                    var child = n.children[j];
                    var mapObj = getMapObj(child, n.id);
                    master[child.id] = mapObj;
                    allDescendants(child, n.id);
                }
            }
        }
    }

    allDescendants(getNavigationRaw());
    return master;
}
