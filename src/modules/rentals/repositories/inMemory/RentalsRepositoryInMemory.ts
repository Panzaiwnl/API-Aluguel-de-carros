import { ICreateRentalDTO } from "../../dtos/ICreateRentalDTO";
import { Rentals } from "../../infra/typeorm/entities/Rentals";
import { IRentalsRepository } from "../IRentalsRepository";



class RentalsRepositoryInMemory implements IRentalsRepository {
   findByUserId(user_id: string): Promise<Rentals[]> {
      throw new Error("Method not implemented.");
   }
 
  
   rentals: Rentals[] = [];

   async findOpenRentalByCar(car_id: string): Promise<Rentals> {
      const rental = await this.rentals.find(rental => rental.car_id === car_id && !rental.end_date );

      return rental;
        

       
    }
   async findOpenRentalByUser(user_id: string): Promise<Rentals> {
       const rental = await this.rentals.find(rental => rental.user_id === user_id && !rental.end_date );

       return rental;   
        
    }

    async create({car_id, user_id, expected_return_date}: ICreateRentalDTO): Promise<Rentals> {
      const rental = new Rentals();

      Object.assign(rental,{
          car_id,
          user_id,
          expected_return_date
         

      })

      this.rentals.push(rental);

      return rental;
      
   }

   async findById(id: string): Promise<Rentals> {
      const rental = await this.rentals.find(rental => rental.id ===id);

      return rental;
   }


   
    


}

export { RentalsRepositoryInMemory }