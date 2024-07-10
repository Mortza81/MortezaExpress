import { Request } from './Request'
import { Response } from './Response'
export type Query = { [index: string]: string[] }
export type URL = string
export type Middleware = (
    req: Request,
    res: Response,
    next: () => Promise<void> | void,
) => Promise<void> | void
export type Route = {
    method: "GET" | "PUT" | "POST" | "DELETE",
    path: string,
    handler: Middleware
}
