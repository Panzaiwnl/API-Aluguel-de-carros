import { getRepository, Repository } from "typeorm";
import { ICreateRentalDTO } from "../../../dtos/ICreateRentalDTO";
import { IRentalsRepository } from "../../../repositories/IRentalsRepository";
import { Rentals } from "../entities/Rentals";


class RentalsRepository implements IRentalsRepository {
    private repository: Repository<Rentals>

    constructor() {
        this.repository = getRepository(Rentals);
    }
    

    async create({ user_id, car_id, expected_return_date, id, end_date, total }: ICreateRentalDTO): Promise<Rentals> {
        const rental = await this.repository.create({
            user_id, car_id, expected_return_date, id, end_date, total
        });

        await this.repository.save(rental);

        return rental;
    }


    async findOpenRentalByCar(car_id: string): Promise<Rentals> {
        const rental = await this.repository.findOne({ 
            where: { car_id, end_date: null }
        });

        return rental;

    }
    async findOpenRentalByUser(user_id: string): Promise<Rentals> {
        const rental = await this.repository.findOne({ 
            where: { user_id, end_date: null }
         });
        return rental;
    }

    async findById(id: string): Promise<Rentals> {
        const rental = await this.repository.findOne(id);

        return rental;
    }

    async findByUserId(user_id: string): Promise<Rentals[]> {
        const rental = await this.repository.find({
            where: { user_id },
            relations: ["car"]
        });

        return rental;
    }

}

export { RentalsRepository }