"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Request = void 0;
class Request {
    req;
    query;
    url;
    constructor(req, query, url) {
        this.req = req;
        this.query = query;
        this.url = url;
    }
}
exports.Request = Request;
