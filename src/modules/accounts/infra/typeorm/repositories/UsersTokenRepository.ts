import { getRepository, Repository } from "typeorm";
import { ICreateUsersTokenDTO } from "../../../dtos/ICreateUsersTokenDTO";
import { IUsersTokenRepository } from "../../../repositories/IUsersTokenRepository";
import { UsersToken } from "../entities/UsersToken";


class UsersTokenRepository implements IUsersTokenRepository{
    private repository: Repository<UsersToken>

    constructor(){
        this.repository = getRepository(UsersToken)
    }


    async create({ user_id, refresh_token, expires_date }: ICreateUsersTokenDTO): Promise<UsersToken> {
        const usersToken = await this.repository.create({
            user_id, refresh_token, expires_date
        });

        await this.repository.save(usersToken);

        return usersToken;
        
    }

}

export {UsersTokenRepository}