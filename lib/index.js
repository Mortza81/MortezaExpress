"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.statics = void 0;
const mime_types_1 = __importDefault(require("mime-types"));
const path_1 = __importDefault(require("path"));
const promises_1 = require("fs/promises");
const handler_1 = __importDefault(require("./handler"));
const http_1 = __importDefault(require("http"));
function statics(root) {
    return async (req, res, next) => {
        const filePath = path_1.default.join(root, req.url || "/");
        try {
            const data = await (0, promises_1.readFile)(filePath);
            res.writeHead(200, { "Content-Type": mime_types_1.default.lookup(filePath) });
            res.end(data);
        }
        catch (err) {
            next();
        }
    };
}
;
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
run.statics=statics
module.exports = run;
