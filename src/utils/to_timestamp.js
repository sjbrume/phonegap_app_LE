export const toTimestamp = (strDate) => {
    let datum = Date.parse(strDate);
    return datum / 1000;
};