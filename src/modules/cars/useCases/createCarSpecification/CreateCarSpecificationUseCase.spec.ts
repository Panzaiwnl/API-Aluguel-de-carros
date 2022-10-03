import { CannotExecuteNotConnectedError } from "typeorm";
import { AppError } from "../../../../shared/errors/AppError";
import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory";
import { SpecificationsRepositoryInMemory } from "../../repositories/in-memory/SpecificationsRepositoryInMemory";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";


let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;

describe("Create Car specification", async () => {
    beforeEach(() => {
        carsRepositoryInMemory =  new CarsRepositoryInMemory();
        specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory(); 
        createCarSpecificationUseCase = new CreateCarSpecificationUseCase(carsRepositoryInMemory, specificationsRepositoryInMemory);
    })


    it("should be not able to create a car specification", async () => {
        expect(async () => {
        const car_id = "1234";
        const specifications_id = "54321"
        await createCarSpecificationUseCase.execute({car_id, specifications_id});

        }).rejects.toBeInstanceOf(AppError);
    });


    it("should be able to create a car specification", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "name car",
            description: "description car",
            daily_rate: 100,
            license_plate: "plate car",
            fine_amount: 60,
            brand: "brand car",
            category_id: "category",
        });

        
    const specification = await specificationsRepositoryInMemory.create({
        description: "test",
        name: "test",

    })
    const specification_id = [specification.id]

    const specificationCars = await createCarSpecificationUseCase.execute({
        car_id: car.id,
        specifications_id: specification.id,
    })

    expect(specificationCars).toHaveProperty("specifications")
    expect(specificationCars.specifications.length).toBe(1)

        const specifications_id = "54321"
        await createCarSpecificationUseCase.execute({car_id: car.id, specifications_id});

    })
})