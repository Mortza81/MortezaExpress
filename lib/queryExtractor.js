"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function extractQueryParams(path) {
    const url = `https://fakedomain.com${path}`;
    const parsedUrl = new URL(url);
    const queryParams = parsedUrl.searchParams;
    const query = {};
    queryParams.forEach((value, key) => {
        const paramValues = value.split(",");
        if (!query[key]) {
            query[key] = [];
        }
        query[key] = query[key].concat(paramValues);
    });
    return query;
}
exports.default = extractQueryParams;
