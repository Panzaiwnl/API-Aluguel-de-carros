import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";


let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;



describe("List Cars", ()=>{
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory)
    })


    it("should be able to list  all available cars", async () =>{
       const car = carsRepositoryInMemory.create({
            name: "Audi A1",
            description: "Carro com espaço",
            daily_rate: 100.0,
            license_plate: "DEF-1234",
            fine_amount: 40,
            brand: "Audi",
            category_id: "ae9e2edsadasdwd90owqdw"
        })

         

       const cars =  await listAvailableCarsUseCase.execute({
        brand: "Car_brand",
        category_id: "aaaaa",
        name: "nome"
       });

       expect(cars).toEqual([car]);

    })

    it("should be able to list car avaliable by name", async () => {

        const car = carsRepositoryInMemory.create({
            name: "Audi A1",
            description: "Carro com espaço",
            daily_rate: 100.0,
            license_plate: "DEF-1234",
            fine_amount: 40,
            brand: "Audi",
            category_id: "ae9e2edsadasdwd90owqdw"
        })

         

       const cars =  await listAvailableCarsUseCase.execute({
        brand: "Car_brand",
        category_id: "aaaaa",
        name: "nome"
       });
        
    })
})