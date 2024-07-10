import { IncomingMessage } from 'http'
import { Query, URL } from './types';
export class Request {
    public query: Query
    public url: URL
    constructor(query: Query, url: URL) {
        this.query = query
        this.url = url
    }
}