import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../repositories/IUserRepository";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { AppError } from "../../../../shared/errors/AppError";
import auth from "../../../../config/auth";
import { IUsersTokenRepository } from "../../repositories/IUsersTokenRepository";
import { IDateProvider } from "../../../../shared/providers/dateProvider/IDateProvider";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
  refresh_token: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("UsersTokenRepository")
    private usersTokenRepository: IUsersTokenRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,
  ) { }
  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);
    const { secret_token, expires_in_token, secret_refresh_token, expires_in_refresh_token, expires_refresh_token_date } = auth

    if (!user) {
      throw new AppError("Email or password incorrect!");
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError("Email or password incorrect!");
    }

    const token = sign({}, secret_token, {
      subject: user.id,
      expiresIn: expires_in_token,
    });


    const refresh_token = sign({ email }, secret_refresh_token,{
      subject: user.id,
      expiresIn: expires_in_refresh_token
    })

    const refresh_token_expires_date = this.dateProvider.addDays(
      expires_refresh_token_date
      );

    await this.usersTokenRepository.create({
      user_id: user.id,
      refresh_token,
      expires_date: refresh_token_expires_date
      
    })

    return {
     token,
     user:{
      name: user.name,
      email: user.email,
     },
     refresh_token
  }
}

}

export { AuthenticateUserUseCase };
