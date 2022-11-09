import { ICreateUsersTokenDTO } from "../dtos/ICreateUsersTokenDTO";
import { UsersToken } from "../infra/typeorm/entities/UsersToken";



interface IUsersTokenRepository{
    create({user_id, refresh_token,expires_date}: ICreateUsersTokenDTO): Promise<UsersToken>;

}

export { IUsersTokenRepository }