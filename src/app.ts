import { Middleware, Route } from "./types";
import http from "http";
import queryExtractor from "./queryExtractor";
import { Response } from "./Response";
import { Request } from "./Request";
class MortezaExpress {
  public middlewares: Middleware[] = [];
  public routes: Route[] = [];
  constructor() {}
  use(middleware: Middleware) {
    this.middlewares.push(middleware);
  }
  get(path: string, handler: Middleware) {
    this.routes.push({
      method: "GET",
      path: path,
      handler,
    });
  }
  post(path: string, handler: Middleware) {
    this.routes.push({
      method: "DELETE",
      path: path,
      handler,
    });
  }
  put(path: string, handler: Middleware) {
    this.routes.push({
      method: "PUT",
      path: path,
      handler,
    });
  }
  delete(path: string, handler: Middleware) {
    this.routes.push({
      method: "DELETE",
      path: path,
      handler,
    });
  }
  listen(port: number, callback: () => void) {
    const server = http.createServer((req, res) => {
      const request = new Request(req, queryExtractor(req.url!));
      const response = new Response(res);
      const method = req.method || "GET";
      const url = req.url?.split(",")[0];
      let index = 0;
      const next = () => {
        if (index < this.middlewares.length) {
          const middleware = this.middlewares[index];
          index++;
        } else {
          var route = this.routes.find((route) => {
            return route.path === url && route.method === method;
          });
        }
        if(route){
          route.handler(request,response)
        }else{
          res.statusCode=404
          res.end('Not Found')
        }
      };
    });
    server.listen(port, callback);
  }
}
