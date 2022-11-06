import dayjs from 'dayjs';
import utc from "dayjs/plugin/utc";
import { inject, injectable } from 'tsyringe';
import { AppError } from "../../../../shared/errors/AppError";
import { IDateProvider } from '../../../../shared/providers/dateProvider/IDateProvider';
import { ICarsRepository } from '../../../cars/repositories/ICarsRepository';
import { Rentals } from "../../infra/typeorm/entities/Rentals";
import { IRentalsRepository } from "../../repositories/IRentalsRepository";

dayjs.extend(utc);

interface IRequest{
    user_id: string;
    car_id: string;
    expected_return_date: Date;

}

@injectable()
class CreateRentalUseCase{
    constructor(
        @inject("RentalsRepository")
        private rentalsRepository: IRentalsRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider,
        @inject("CarsRepository")
        private carsRepository: ICarsRepository
    ){}


    async execute({user_id, car_id, expected_return_date}: IRequest): Promise<Rentals>{
        const minimumHour = 24;
        const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(car_id);

        if(carUnavailable){
            throw new AppError("Car  is unavailable");
        }


        const rentalOpenToUSer = await this.rentalsRepository.findOpenRentalByUser(user_id);

        if(rentalOpenToUSer){
            throw new AppError("there is a rental in progress for user");
        }
    
        const dateNow = this.dateProvider.dateNow();

        const compare = this.dateProvider.compareInHours(dateNow, expected_return_date);

        if(compare < minimumHour){
            throw new AppError("Invalid return  time");
        }
        
        


        
        const rental = await this.rentalsRepository.create({
            user_id,
            car_id,
            expected_return_date    

        });

        await this.carsRepository.updateAvailable(car_id, false)

        return rental;


    }

}

export { CreateRentalUseCase }