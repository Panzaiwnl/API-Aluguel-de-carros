import { AppError } from "../../../../shared/errors/AppError";
import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory";
import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create car", () => {
    beforeEach(() =>{
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
    });


it("should be able to create a new car", async () => {
    await createCarUseCase.execute({
        name: "name car",
        description: "description car",
        daily_rate: 100,
        license_plate: "plate car",
        fine_amount: 0,
        brand: "brand car",
        category_id: "category",

    });
});

it("should be able to create a car with available true by default", async () => {
   expect(async ()=>{
   const car = await createCarUseCase.execute({
        name: "name car",
        description: "description car",
        daily_rate: 100,
        license_plate: "ABC-1234",
        fine_amount: 0,
        brand: "brand car",
        category_id: "category",
   });
   expect(car.available).toBe(true);
      })
  
    });
});