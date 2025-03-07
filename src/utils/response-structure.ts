import { Response } from "express";

export interface CustomResponse extends Response{
success(data:any, statusCode?:number, message?:string):void;
error(statusCode?:number, message?:string, error?:any, errorCode?:number):void;
}