export function getNavigationRaw() {
    return require('../dataset/navigation.json');
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