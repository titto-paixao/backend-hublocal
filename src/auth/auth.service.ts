import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/app/user/user.entity';
import { UserService } from 'src/app/user/user.service';
import { compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly useService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user) {
    const payload = { sub: user.id, email: user.email };

    delete user.password;
    delete user.createdAt;
    delete user.updateAt;
    delete user.deletedAt;

    return {
      token: this.jwtService.sign(payload),
      user,
    };
  }

  async validateUser(email: string, password: string) {
    let user: UserEntity;
    try {
      user = await this.useService.findOneOrFail({ where: { email } });
    } catch (error) {
      return null;
    }

    const isPasswordValid = compareSync(password, user.password);

    if (!isPasswordValid) return null;

    return user;
  }
}
