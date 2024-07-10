import { Middleware, Route } from "./types";
import http, { IncomingMessage, ServerResponse } from "http";
import queryExtractor from "./queryExtractor";
import { Response } from "./Response";
import { Request } from "./Request";
export default function responseHandler(req: IncomingMessage, res: ServerResponse, routes: Route[], middlewares: Middleware[]) {

  const url = req.url?.split("?")[0] || "/";
  const request = new Request(queryExtractor(req.url!), url);
  const response = new Response(res);
  const method = req.method || "GET";
  let index = 0;
  const route = routes.find((route) => route.path === url && route.method === method);
  const handler = route?.handler;

  const next = async () => {
    if (index < middlewares.length) {
      const middleware = middlewares[index];
      index++;

      if (routes.some(route => route.handler === middleware)) {
        if (middleware === handler) {
          try {
            await middleware(request, response,()=>{});
          } catch (err) {
            const error = err as Error;
            response.json({
              err: error.message
            })
          }
        } else {
          next();
        }
      } else {
        try {
          await middleware(request, response, next);
        } catch (err) {
          const error = err as Error;
          response.json({
            err: error.message
          })
        }
      }
    } else {

      res.statusCode = 404;
      res.end("Not Found");
    }
  };

  next();

}