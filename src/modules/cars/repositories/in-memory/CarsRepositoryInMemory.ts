import { Car } from "../../infra/typeorm/entities/Car";

import { ICarsRepository } from "../ICarsRepository";



class CarsRepositoryInMemory implements ICarsRepository {
    
    cars: Car [] = [];
    async create({brand, category_id, dale_rate, description, fine_amount, name, license_plate}: ICreateCarDTO): Promise<void> {
        const car = new Car();

        Object.assign(car, {
            brand,
            category_id,
            dale_rate, 
            description,
            fine_amount,
            name,
            license_plate
        });

        this.cars.push(car);
    }

   async findByLicensePlate(license_plate: string): Promise<Car> {
        const license =  await this.cars.find(car => car.license_plate === license_plate);

        return license;
    }

    

  
}



export {CarsRepositoryInMemory}