import {IncomingMessage} from 'http'
import {Query} from './types';
export class Request{
    public query:Query
    constructor(private req:IncomingMessage,query:Query){
        this.query=query
    }
}