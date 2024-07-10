"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.statics = void 0;
const path_1 = __importDefault(require("path"));
const promises_1 = require("fs/promises");
const handler_1 = __importDefault(require("./handler"));
const http_1 = __importDefault(require("http"));
function statics(root) {
    return async (req, res, next) => {
        const filePath = path_1.default.join(root, req.url || "/");
        try {
            const data = await (0, promises_1.readFile)(filePath);
            res.writeHead(200, { "Content-Type": getContentType(filePath) });
            res.end(data);
        }
        catch (err) {
            next();
        }
    };
}

;
const getContentType = (filePath) => {
    const ext = filePath.split(".").pop();
    switch (ext) {
        case "html":
            return "text/html";
        case "css":
            return "text/css";
        case "js":
            return "application/javascript";
        case "json":
            return "application/json";
        case "png":
            return "image/png";
        case "jpg":
            return "image/jpeg";
        case "gif":
            return "image/gif";
        default:
            return "application/octet-stream";
    }
};
class MortezaExpress {
    middlewares = [];
    routes = [];
    constructor() { }
    use(...middlewares) {
        this.middlewares = this.middlewares.concat(middlewares);
    }
    get(path, handler) {
        this.routes.push({
            method: "GET",
            path: path,
            handler,
        });
        this.middlewares.push(handler);
    }
    post(path, handler) {
        this.routes.push({
            method: "POST",
            path: path,
            handler,
        });
        this.middlewares.push(handler);
    }
    put(path, handler) {
        this.routes.push({
            method: "PUT",
            path: path,
            handler,
        });
        this.middlewares.push(handler);
    }
    delete(path, handler) {
        this.routes.push({
            method: "DELETE",
            path: path,
            handler,
        });
        this.middlewares.push(handler);
    }
    listen(port, callback) {
        const server = http_1.default.createServer((req, res) => {
            (0, handler_1.default)(req, res, this.routes, this.middlewares);
        });
        server.listen(port, callback);
    }
}
function run() {
    return new MortezaExpress();
}

module.exports= run;
run.statics=statics
