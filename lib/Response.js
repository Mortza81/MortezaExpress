"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Response = void 0;
class Response {
    res;
    constructor(res) {
        this.res = res;
    }
    json(data) {
        this.res.setHeader('Content-Type', 'application/json');
        this.res.end(JSON.stringify(data));
    }
    redirect(path) {
        this.res.statusCode = 302;
        this.res.setHeader('Location', path);
        this.res.end();
    }
    setHeader(name, value) {
        this.res.setHeader(name, value);
    }
    writeHead(statusCode, headers) {
        this.res.writeHead(statusCode, headers);
    }
    end(chunk) {
        this.res.end(chunk);
    }
    write(chunk) {
        this.res.write(chunk);
    }
}
exports.Response = Response;
