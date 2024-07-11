import { Middleware, Route } from "./types";
import mime from 'mime-types'
import path from 'path'
import { readFile } from "fs/promises";
import { Response } from "./Response";
import { Request } from "./Request";
import handler from './handler'
import http from 'http'
export function statics(root: string) {
  return async (req: Request, res: Response, next: Function) => {
    const filePath = path.join(root, req.url || "/");
    try {
      const data = await readFile(filePath);
      res.writeHead(200, { "Content-Type": mime.lookup(filePath) });
      res.end(data);
    }
    catch (err) {
      next();
    }
  };
};
class MortezaExpress {
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
      handler(req,res,this.routes,this.middlewares)
    });
    server.listen(port, callback);
  }
}

export default function run() {
  return new MortezaExpress();
}
