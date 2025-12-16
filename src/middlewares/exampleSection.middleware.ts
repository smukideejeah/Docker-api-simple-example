import { NextFunction, Request, Response } from "express";

export default async function(req: Request, res: Response, next: NextFunction){
    // Example all sections middleware: log request method and url
    //write your custom logic here
    console.log("Example section middleware executed in: ", req.method, req.url);
    next();
}