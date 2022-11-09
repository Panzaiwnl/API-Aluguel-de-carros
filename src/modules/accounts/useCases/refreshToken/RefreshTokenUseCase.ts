import { sign, verify } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import auth from "../../../../config/auth";
import { AppError } from "../../../../shared/errors/AppError";
import { IDateProvider } from "../../../../shared/providers/dateProvider/IDateProvider";
import { IUsersTokenRepository } from "../../repositories/IUsersTokenRepository";

interface IPayload{
    sub: string;
    email: string;
}


@injectable()
class RefreshTokenUseCase {
    constructor(
        @inject("UsersTokenRepository")
        private usersTokenRepository: IUsersTokenRepository,
        @inject("DayjsDateProvider")
        private DateProvider: IDateProvider
    ) { }

    async execute(token: string) {
        const {email, sub} = verify(token, auth.secret_refresh_token) as IPayload;

        const user_id = sub;

        const userTokens = await this.usersTokenRepository.findByUserIdAndRefreshToken(
            user_id,
            token
            );

        if(!userTokens){
            throw new AppError("Refresh token error!");
        }

        await this.usersTokenRepository.deleteById(userTokens.id);

        const refresh_token = sign({ email }, auth.secret_refresh_token,{
            subject: sub,
            expiresIn: expires_in_refresh_token
          })




    }

}

export { RefreshTokenUseCase }