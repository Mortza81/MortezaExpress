"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const queryExtractor_1 = __importDefault(require("./queryExtractor"));
const Response_1 = require("./Response");
const Request_1 = require("./Request");
function responseHandler(req, res, routes, middlewares) {
    const url = req.url?.split("?")[0] || "/";
    const request = new Request_1.Request(req, (0, queryExtractor_1.default)(req.url), url);
    const response = new Response_1.Response(res);
    const method = req.method || "GET";
    let index = 0;
    const route = routes.find((route) => route.path === url && route.method === method);
    const handler = route?.handler;
    const next = () => {
        if (index < middlewares.length) {
            const middleware = middlewares[index];
            index++;
            if (routes.some(route => route.handler === middleware)) {
                if (middleware === handler) {
                    try {
                        middleware(request, response, () => { });
                    }
                    catch (err) {
                        response.json({
                            error:err.message
                        });
                    }
                }
                else {
                    next();
                }
            }
            else {
                try {
                    middleware(request, response, next);
                }
                catch (err) {
                    response.json({
                        error:err
                    });
                }
            }
        }
        else {
            if (route) {
                const route = routes.find((route) => route.path === url && route.method === method);
            }
            else {
                res.statusCode = 404;
                res.end("Not Found");
            }
        }
    };
    next();
}
exports.default = responseHandler;
