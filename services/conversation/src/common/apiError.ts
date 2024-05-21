// import { Response } from "express";
// import { ErrorType } from "../constants/enum";

// export abstract class ApiError extends Error{
//     constructor(public type: ErrorType, public message: string = "error"){
//         super(type)
//     }

//     public static handleError(err: ApiError, res: Response): Response{

//     }
// }

// export class InternalServerError extends ApiError{
//  constructor(message = "Internal Server Error"){
//     super(ErrorType.INTERNAL, message)
//  }
// }
