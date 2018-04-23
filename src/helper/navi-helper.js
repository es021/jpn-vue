import { AppRoot } from '../config/app-config';
export const NAVI_ROOT = "menu-utama";
export function goToHome() {
    window.location = AppRoot;
}
export function getNavigationRaw() {
    return require('../dataset/navigation.json');
}

export function getNavigationMapRaw() {
    return require('../dataset/navigation-map.json');
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

    var debug = id == "pendaftaran-pengangkatan-mahkamah";

    if (debug) {
        return {};
    }

    var siblings = getNavigationSiblings(id);
    for (var i in siblings) {
        if (siblings[i].id == id) {
            return siblings[i];
        }
    }
}

export function getNaviUrl(d) {
    var r = "";
    if (d.url && d.url !== null && d.url !== "") {
        r = d.url;
    } else {
        r = `${AppRoot}/?page=${d.id}`;
    }
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
