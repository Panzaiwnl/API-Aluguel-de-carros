import { Request, Response, response } from "express"
import { container } from "tsyringe";
import { RefreshTokenUseCase } from "./RefreshTokenUseCase";


class RefreshTookenController {
    async handle(request: Request, response: Response): Promise<Response> { 
        const token = request.body.token || request.headers["x-acess-token"] || request.query.token;

        const refreshTokenUseCase = container.resolve(RefreshTokenUseCase)
    }

}

export { RefreshTookenController }