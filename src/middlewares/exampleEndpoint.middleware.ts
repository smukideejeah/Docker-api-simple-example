import { NextFunction, Request, Response } from 'express';

//Example middleware
export default async function (
	req: Request,
	res: Response,
	next: NextFunction
) {
	// Example endpoint middleware: log the example endpoint access
	//write your custom logic here
	console.log(`Example endpoint accessed at ${new Date().toISOString()}`);
	next();
}
