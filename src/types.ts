import {Request} from './Request'
import {Response} from './Response'
export type Query={[index: string]:string[]}
export type Middleware=(
    req:Request,
    res:Response,
    next:()=>void
)=>void
export type Route={
    method:"GET"|"PUT"|"POST"|"DELETE",
    path:string,
    handler:Middleware
}
