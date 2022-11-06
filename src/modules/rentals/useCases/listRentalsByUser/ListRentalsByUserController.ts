import { Request, response, Response } from "express"
import { container } from "tsyringe";
import { ListRentalsByUserUseCase } from "./ListRentalsByUserUseCase";

class ListRentalsByUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.user;

        const listRentalsByUserUseCase = await container.resolve(ListRentalsByUserUseCase);

        const rental = await listRentalsByUserUseCase.execute({user_id: id});

        return response.json(rental);

    }

}

export { ListRentalsByUserController }