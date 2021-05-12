import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  name: string;
  email: string;
}

class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ email, name }: IRequest): User {
    const mail = this.usersRepository.findByEmail(email)
    if (mail){
      throw new Error("usuário já cadastrado");
    }
    const user : User = this.usersRepository.create({email,name})
    return user
  }
}

export { CreateUserUseCase };
