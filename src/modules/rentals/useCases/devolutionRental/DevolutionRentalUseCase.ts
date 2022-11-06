import { inject, injectable } from "tsyringe";
import dayjs from 'dayjs';
import utc from "dayjs/plugin/utc";
import { AppError } from "../../../../shared/errors/AppError";
import { ICarsRepository } from "../../../cars/repositories/ICarsRepository";
import { Rentals } from "../../infra/typeorm/entities/Rentals";
import { IRentalsRepository } from "../../repositories/IRentalsRepository";
import { IDateProvider } from "../../../../shared/providers/dateProvider/IDateProvider";

interface IRequest{
    id: string;
    user_id: string;
    

}

dayjs.extend(utc);

@injectable()
class DevolutionRentalUseCase {
    constructor(
        @inject("RentalsRepository")
        private rentalsRepository: IRentalsRepository,
        @inject("CarsRepository")
        private carsRepository: ICarsRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider
    ){}



    async execute({id, user_id}: IRequest): Promise<Rentals>{
        const rental = await this.rentalsRepository.findById(id);
        const car = await this.carsRepository.findById(rental.car_id);
        const minimum_daily = 1;

        if(!rental){
            throw new AppError("Rental not found");
        }

        const dateNow = this.dateProvider.dateNow();

        const daily = this.dateProvider.compareInDays(
            rental.start_date,
            this.dateProvider.dateNow()
        );
        if(daily <= minimum_daily){
            let daily = 1;
        }

        const delay = this.dateProvider.compareInDays(
            dateNow,
            rental.expected_return_date
        );

        let total = 0;

        if(delay > 0){
            const calculate_fine = delay * car.fine_amount;
            total = calculate_fine;
        }

        total += delay * car.daily_rate;

        rental.end_date = this.dateProvider.dateNow();
        rental.total = total;

        await this.rentalsRepository.create(rental);
        await this.carsRepository.updateAvailable(car.id, true);

        return rental;

       
    }

}

export { DevolutionRentalUseCase } 