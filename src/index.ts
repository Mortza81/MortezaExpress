import { Middleware, Route } from "./types";
import http from "http";
import queryExtractor from "./queryExtractor";
import path from 'path'
import { readFile } from "fs/promises";
import { Response } from "./Response";
import { Request } from "./Request";

export function statics(root: string) {
  return async (req: Request, res: Response, next: Function) => {
    const filePath = path.join(root, req.url || "/");
    try {
      const data = await readFile(filePath);
      res.writeHead(200, { "Content-Type": getContentType(filePath) });
      res.end(data);
    }
    catch (err) {
      next();
    }
  };
};
const getContentType = (filePath: string): string => {
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
  private handlers: Middleware[] = []
  private middlewares: Middleware[] = [];
  private routes: Route[] = [];
  constructor() { }
  use(...middlewares: Middleware[]) {
    this.middlewares = this.middlewares.concat(middlewares);
  }
  get(path: string, handler: Middleware) {
    this.routes.push({
      method: "GET",
      path: path,
      handler,
    });
    this.middlewares.push(handler)
  }
  post(path: string, handler: Middleware) {
    this.routes.push({
      method: "POST",
      path: path,
      handler,
    });
    this.middlewares.push(handler)
  }
  put(path: string, handler: Middleware) {
    this.routes.push({
      method: "PUT",
      path: path,
      handler,
    });
    this.middlewares.push(handler)
  }
  delete(path: string, handler: Middleware) {
    this.routes.push({
      method: "DELETE",
      path: path,
      handler,
    });
    this.middlewares.push(handler)
  }
  listen(port: number, callback: () => void) {
    const server = http.createServer((req, res) => {
      const url = req.url?.split("?")[0] || "/";
      const request = new Request(req, queryExtractor(req.url!), url);
      const response = new Response(res);
      const method = req.method || "GET";
      let index = 0;
      const route = this.routes.find((route) => route.path === url && route.method === method);
      const handler = route?.handler;

      const next = () => {
        if (index < this.middlewares.length) {
          const middleware = this.middlewares[index];
          index++;

          if (this.routes.some(route => route.handler === middleware)) {
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
    });

    server.listen(port, callback);
  }
}

export default function run() {
  return new MortezaExpress();
}