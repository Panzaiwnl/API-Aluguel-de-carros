import { inject, injectable } from "tsyringe";
import { Rentals } from "../../infra/typeorm/entities/Rentals";
import { IRentalsRepository } from "../../repositories/IRentalsRepository";



@injectable()
class ListRentalsByUserUseCase{
    constructor(
        @inject("RentalsRepository")
        private rentalsRepository: IRentalsRepository       
    ){}

    async execute({user_id}): Promise<Rentals[]>{
        const rentals = await this.rentalsRepository.findByUserId(user_id);

        return rentals;
    }

}

export {ListRentalsByUserUseCase}