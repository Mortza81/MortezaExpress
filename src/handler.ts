import { Middleware, Route } from "./types";
import http, { IncomingMessage, ServerResponse } from "http";
import queryExtractor from "./queryExtractor";
import { Response } from "./Response";
import { Request } from "./Request";
export default function responseHandler(req:IncomingMessage,res:ServerResponse,routes:Route[],middlewares:Middleware[]){
  
    const url = req.url?.split("?")[0] || "/";
    const request = new Request(req, queryExtractor(req.url!), url);
    const response = new Response(res);
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
            middleware(request, response, () => { });
          } else {
            next();
          }
        } else {
          middleware(request, response, next);
        }
      } else {
        if (route) {
          route.handler(request, response, () => { });
        } else {
          res.statusCode = 404;
          res.end("Not Found");
        }
      }
    };
  
    next();
  
  }