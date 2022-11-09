import { getRepository, Repository } from "typeorm";
import { ICreateUsersTokenDTO } from "../../../dtos/ICreateUsersTokenDTO";
import { IUsersTokenRepository } from "../../../repositories/IUsersTokenRepository";
import { UsersToken } from "../entities/UsersToken";


class UsersTokenRepository implements IUsersTokenRepository{
    private repository: Repository<UsersToken>

    constructor(){
        this.repository = getRepository(UsersToken)
    }
    deleteById(user_id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    


    async create({ user_id, refresh_token, expires_date }: ICreateUsersTokenDTO): Promise<UsersToken> {
        const usersToken = await this.repository.create({
            user_id, refresh_token, expires_date
        });

        await this.repository.save(usersToken);

        return usersToken;
        
    }

    async findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UsersToken> {
        const userToken = await this.repository.findOne({
            user_id,
            refresh_token
        });

        return userToken;
    }

}

export {UsersTokenRepository}