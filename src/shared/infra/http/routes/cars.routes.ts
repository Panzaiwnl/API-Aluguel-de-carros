import { Router } from "express";
import multer from "multer";
import uploadConfig from "../../../../config/upload";
import { CreateCarController } from "../../../../modules/cars/useCases/createCar/CreateCarController";
import { CreateCarSpecificationController } from "../../../../modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";
import { ListAvailableCarsController } from "../../../../modules/cars/useCases/listAvailableCars/ListAvailableCarsControllers";
import { UploadCarImageController } from "../../../../modules/cars/useCases/uploadImage/UploadCarImageController";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationController =  new CreateCarSpecificationController();
const uploadCarImageController = new UploadCarImageController();

const uploadAvatar = multer(uploadConfig.upload("./tmp/cars"));

carsRoutes.post("/",ensureAuthenticated, ensureAdmin, createCarController.handle);
carsRoutes.get("/available", listAvailableCarsController.handle);
carsRoutes.post("/", ensureAuthenticated, createCarSpecificationController.handle);
carsRoutes.post("/images", ensureAuthenticated, ensureAdmin,uploadAvatar.array("image") , uploadCarImageController.handle);

export {carsRoutes}