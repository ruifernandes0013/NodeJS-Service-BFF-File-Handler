import { Request, Response } from 'express';

interface IResponse {
    status: number;
    data?: any;
    message?: string;
}

export abstract class BaseController {
    abstract executeImpl(req: Request, res: Response): Promise<void | any>;

    public async execute(req: Request, res: Response): Promise<void> {
        try {
            await this.executeImpl(req, res);
        } catch (err) {
            console.log(`[BaseController]: Uncaught controller error`);
            console.log(err);
            this.fail(req, res, 'An unexpected error occurred');
        }
    }

    public static jsonResponse(req: Request, res: Response, code: number, data?: any): Response {
        return res.status(code).json({ data });
    }

    public ok<T>(req: Request, res: Response, dto?: T): Response<IResponse> {
        if (dto) {
            res.type('application/json');
            return BaseController.jsonResponse(req, res, 200, dto);
        } else {
            return BaseController.jsonResponse(req, res, 200);
        }
    }

    public paginatedOk<T>(req: Request, res: Response, count: number, dtos: T[]): Response {
        res.type('application/json');
        res.append('X-Total-Count', count.toString());
        return res.status(200).json(dtos);
    }

    public created<T>(req: Request, res: Response, dto?: T): Response {
        if (dto) {
            res.type('application/json');
            return BaseController.jsonResponse(req, res, 201, dto);
        } else {
            return BaseController.jsonResponse(req, res, 201);
        }
    }

    public legalIssue(req: Request, res: Response, message?: string): Response {
        return BaseController.jsonResponse(req, res, 451, message ? message : 'Unavailable For Legal Reasons');
    }

    public badRequest(req: Request, res: Response, message?: string): Response {
        return BaseController.jsonResponse(req, res, 400, message ? message : 'Bad Request');
    }

    public clientError(req: Request, res: Response, message?: string): Response {
        return BaseController.jsonResponse(req, res, 400, message ? message : 'Unauthorized');
    }

    public unauthorized(req: Request, res: Response, message?: string): Response {
        return BaseController.jsonResponse(req, res, 401, message ? message : 'Unauthorized');
    }

    public paymentRequired(req: Request, res: Response, message?: string): Response {
        return BaseController.jsonResponse(req, res, 402, message ? message : 'Payment required');
    }

    public forbidden(req: Request, res: Response, message?: string): Response {
        return BaseController.jsonResponse(req, res, 403, message ? message : 'Forbidden');
    }

    public notFound(req: Request, res: Response, message?: string): Response {
        return BaseController.jsonResponse(req, res, 404, message ? message : 'Not found');
    }

    public conflict(req: Request, res: Response, message?: string): Response {
        return BaseController.jsonResponse(req, res, 409, message ? message : 'Conflict');
    }

    public tooMany(req: Request, res: Response, message?: string): Response {
        return BaseController.jsonResponse(req, res, 429, message ? message : 'Too many requests');
    }

    public todo(req: Request, res: Response): Response {
        return BaseController.jsonResponse(req, res, 400, 'TODO');
    }

    public fail(req: Request, res: Response, error: Error | string): Response<IResponse> {
        console.log(error);
        let errorLog = error.toString();
        if (typeof error != 'string') {
            errorLog = `${error.message}\n${error.stack}`;
        }
        return BaseController.jsonResponse(req, res, 500, error.toString());
    }
}
