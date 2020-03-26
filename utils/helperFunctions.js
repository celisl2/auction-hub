let getCode = (num) => {
    return String.fromCharCode(num);
};

function splitRows(arr) {
    let rows = Math.ceil(arr.length/2);
    let obj = { data: []};

    for(let i = 0; i < rows; i++) {
        obj['data'].push(arr.slice(0,2));
        arr.splice(0,2);
    }
    return obj['data'];
}
export {getCode, splitRows};