/// <reference types="node" />

import { IncomingMessage, ServerResponse } from 'http';
declare class Response {
    constructor(private res: ServerResponse) {
    }
    json(data: object) :void
    redirect(path: string):void
    setHeader(name:string,value:string|number|string[]):void
    writeHead(statusCode:number,headers?:{}):void
    end(chunk:any) :void
    write(chunk:any):void
}
declare class Request {
    query: Query
    url: URL
    constructor(private req: IncomingMessage, query: Query, url: URL) {}
}  
type Middleware = (req: Request, res: Response, next: () => void) => void;
type RequestHandler = (req: Request, res: Response, next: () => void) => void;

export function statics(root: string): Middleware;

interface Route {
    method: string;
    path: string;
    handler: RequestHandler;
}

declare class MortezaExpress {
    handlers: Middleware[];
    middlewares: Middleware[];
    routes: Route[];

    use(...middlewares: Middleware[]): void;
    get(path: string, handler: RequestHandler): void;
    post(path: string, handler: RequestHandler): void;
    put(path: string, handler: RequestHandler): void;
    delete(path: string, handler: RequestHandler): void;
    listen(port: number, callback: () => void): void;
}

declare function run(): MortezaExpress;

type Query = { [index: string]: string[] }
type URL = string

type Route = {
    method: "GET" | "PUT" | "POST" | "DELETE",
    path: string,
    handler: Middleware
}
export = run;
