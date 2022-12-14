import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../../../../shared/errors/AppError";
import { UsersRepository } from "../../../../modules/accounts/infra/typeorm/repositories/UsersRepository";
import { UsersTokenRepository } from "../../../../modules/accounts/infra/typeorm/repositories/UsersTokenRepository";
import auth from "../../../../config/auth";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;
  const usersTokenRepository = new UsersTokenRepository();

  if (!authHeader) throw new AppError("Token Missing", 401);

  const [, token] = authHeader.split(" ");
  try {
    const { sub: user_id } = verify(
      token,
      auth.secret_refresh_token
    ) as IPayload;

    const usersRepository = new UsersRepository();
    const user = await usersRepository.findById(user_id);

    if (!user) throw new AppError("User does not exists!", 401);

    request.user = {
      id: user_id,
    };

    next();
  } catch {
    throw new AppError("Invalid token!", 401);
  }
}
