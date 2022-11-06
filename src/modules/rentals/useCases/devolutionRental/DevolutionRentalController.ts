import { Request, response, Response } from "express"
import { container } from "tsyringe";
import { DevolutionRentalUseCase } from "./DevolutionRentalUseCase";


class DevolutionRentalController {
   async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const { id: user_id } = request.body;

        const createRentalUseCase = await container.resolve(DevolutionRentalUseCase);
        const rental = await createRentalUseCase.execute({ user_id, id });

        return response.status(200).json(rental);

    }
}

export { DevolutionRentalController }