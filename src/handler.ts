import { Middleware, Route } from "./types";
import http, { IncomingMessage, ServerResponse } from "http";
import queryExtractor from "./queryExtractor";
import { Response } from "./Response";
import { Request } from "./Request";
export default function responseHandler(req: IncomingMessage, res: ServerResponse, routes: Route[], middlewares: Middleware[]) {

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
          try {
            middleware(request, response, () => { });
          } catch (err) {
            res.write(err)
          }
        } else {
          next();
        }
      } else {
        try {
          middleware(request, response, next);
        } catch (err) {
          res.write(err)
        }
      }
    } else {
      if (route) {
        const route = routes.find((route) => route.path === url && route.method === method);
      } else {
        res.statusCode = 404;
        res.end("Not Found");
      }
    }
  };

  next();

}