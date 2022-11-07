import { ICreateUsersTokenDTO } from "../dtos/ICreateUsersTokenDTO";



interface IUsersTokenRepository{
    create({}: ICreateUsersTokenDTO);

}

export { IUsersTokenRepository }