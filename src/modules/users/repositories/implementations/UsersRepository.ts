import {v4 as uuid4} from 'uuid'

import { User } from "../../model/User";
import { IUsersRepository, ICreateUserDTO } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private users: User[];

  private static INSTANCE: UsersRepository;

  private constructor() {
    this.users = [];
  }

  public static getInstance(): UsersRepository {
    if (!UsersRepository.INSTANCE) {
      UsersRepository.INSTANCE = new UsersRepository();
    }

    return UsersRepository.INSTANCE;
  }

  create({ name, email }: ICreateUserDTO): User {
    const user : User = {
      id: uuid4(),
    
      name,
    
      admin: false,
    
      email,
    
      created_at: new Date(),
    
      updated_at: new Date()
    }

    this.users.push(user)
    return user
  }

  findById(id: string ): User | undefined  {
    const user = this.users.find(item=>{return item.id === id})   
    
    return user
  }

  findByEmail(email: string): User | undefined  {
    const user = this.users.find(item=>{return item.email === email})   
    return user
  }

  turnAdmin(receivedUser: User): User {
    const user = this.users.find(item=>{return item.id === receivedUser.id})
    if (!user) {
      throw new Error("usuário não existe");
    }
    user.admin = true
    return user
  }

  list(): User[]  {
    return this.users
  }
}

export { UsersRepository };
