"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Request = void 0;
class Request {
    query;
    url;
    constructor(query, url) {
        this.query = query;
        this.url = url;
    }
}
exports.Request = Request;
