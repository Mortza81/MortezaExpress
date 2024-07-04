import { ServerResponse } from "http";
export class Response {
  constructor(private res: ServerResponse) {}
  json(data:object){
    this.res.setHeader('Content-Type','application/json')
    this.res.end(JSON.stringify(data))
  }
  redirect(path:string){
    this.res.statusCode=302
    this.res.setHeader('Location',path)
    this.res.end()
  }
}
