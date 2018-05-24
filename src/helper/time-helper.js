export function getUnixTimestampNow() {
    return Math.round((new Date()).getTime() / 1000);
}

function pad(num, size) {
    var s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
}

export function getTimeString(unix) {
    var date = new Date(unix * 1000);

    var y = date.getFullYear();
    var m = pad(date.getMonth() + 1, 2);
    var d = pad(date.getDate(), 2);
    var h = pad(date.getHours(), 2);
    var min = pad(date.getMinutes(), 2);
    var s = pad(date.getSeconds(), 2);
    
    var ret = `${d}/${m}/${y} ${h}:${min}:${s}`;
    return ret;
}