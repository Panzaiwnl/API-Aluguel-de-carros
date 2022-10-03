import { injectable, inject } from "tsyringe";
import { ICarsImageRepository } from "../../repositories/ICarsImageRepository";

interface IRequest{
    car_id: string;
    image_name: string[];
}

@injectable()
class UploadCarImageUseCase{
    constructor(
        @inject("CarsImageRepository")
        private carsImageRepository: ICarsImageRepository
    
    ){}
        



    async execute({car_id, image_name}: IRequest): Promise<void>{

        image_name.map( async (image) => {
            await this.carsImageRepository.create(car_id, image);
        })

    }

}


export {UploadCarImageUseCase} 

