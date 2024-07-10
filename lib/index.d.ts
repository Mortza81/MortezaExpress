/// <reference types="node" />

export declare class Response {
    json(data: object) :void
    redirect(path: string):void
    setHeader(name:string,value:string|number|string[]):void
    writeHead(statusCode:number,headers?:{}):void
    end(chunk:any) :void
    write(chunk:any):void
}
export declare class Request {
    query: Query
    url: URL
}  
type Middleware = (req: Request, res: Response, next: () => Promise<void> | void) => Promise<void>|void;

export function statics(root: string): Middleware;


declare class MortezaExpress {
    use(...middlewares: Middleware[]): void;
    get(path: string, handler: Middleware): void;
    post(path: string, handler:  Middleware): void;
    put(path: string, handler:  Middleware): void;
    delete(path: string, handler:  Middleware): void;
    listen(port: number, callback: () => void): void;
}

declare function run(): MortezaExpress;

type Query = { [index: string]: string[] }
type URL = string


export = run;
