import dayjs from 'dayjs';
import { AppError } from "../../../../shared/errors/AppError";
import { DayjsDateProvider } from '../../../../shared/providers/dateProvider/implementations/DayjsDateProvider';
import { CarsRepositoryInMemory } from '../../../cars/repositories/in-memory/CarsRepositoryInMemory';
import { RentalsRepositoryInMemory } from "../../repositories/inMemory/RentalsRepositoryInMemory";
import { CreateRentalUseCase } from "./CreateRentalUseCase";


let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory
let carsRepositoryInMemory: CarsRepositoryInMemory
let dayjsDateProvider: DayjsDateProvider

describe("create rental", () => {
    const dayAdd24Hours = dayjs().add(1, "day").toDate();

    beforeEach(() => {
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory() 
        dayjsDateProvider = new DayjsDateProvider()
        createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory,dayjsDateProvider, carsRepositoryInMemory);
    });


    it("should be able to create a new rental ", async () => {
       const rental = await createRentalUseCase.execute({
            user_id: "12345",
            car_id: "12121221",
            expected_return_date: dayAdd24Hours
        });

        expect(rental).toHaveProperty("id")
        expect(rental).toHaveProperty("start_date")
    });

    it("should be not able to create a new rental if there is a another open  to the same user", async () => {
        expect(async () => {
            await createRentalUseCase.execute({
                user_id: "12345",
                car_id: "12121221",
                expected_return_date: dayAdd24Hours
            });
   
             await createRentalUseCase.execute({
               user_id: "12345",
               car_id: "12121221",
               expected_return_date: dayAdd24Hours
           })
        }).rejects.toBeInstanceOf(AppError)
 
    });

    it("should be not able to create a new rental with invalid return time", async ()=>{
        await createRentalUseCase.execute({
            user_id: "12345",
            car_id: "1212",
            expected_return_date: dayjs().toDate(),
        });
    });

});