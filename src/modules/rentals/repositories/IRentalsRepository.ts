import {  ICreateRentalDTO } from "../dtos/ICreateRentalDTO"
import { Rentals } from "../infra/typeorm/entities/Rentals"



interface IRentalsRepository{
    findOpenRentalByCar(car_id:string): Promise<Rentals>
    findOpenRentalByUser(user_id:string): Promise<Rentals>
    create(data: ICreateRentalDTO): Promise<Rentals>
    findById(id:string): Promise<Rentals>
    findByUserId(user_id:string): Promise<Rentals[]>

}

export { IRentalsRepository }