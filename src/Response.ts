import { ServerResponse } from "http";
export class Response {
  constructor(private res: ServerResponse) {
  }
  json(data: object) {
    this.res.setHeader('Content-Type', 'application/json')
    this.res.end(JSON.stringify(data))
  }
  redirect(path: string) {
    this.res.statusCode = 302
    this.res.setHeader('Location', path)
    this.res.end()
  }
  setHeader(name: string, value: string | number | string[]) {
    this.res.setHeader(name, value)
  }
  writeHead(statusCode: number, headers?: {}) {
    this.res.writeHead(statusCode, headers)
  }
  end(chunk: any) {
    this.res.end(chunk)
  }
  write(chunk: any) {
    this.res.write(chunk)
  }
}
