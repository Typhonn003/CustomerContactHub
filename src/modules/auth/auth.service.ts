import { Injectable } from '@nestjs/common';
import { CustomersService } from '../customers/customers.service';
import { compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private customersService: CustomersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(userEmail: string, userPassword: string) {
    const user = await this.customersService.findEmail(userEmail);
    if (user) {
      const passwordMatch = await compare(userPassword, user.password);
      if (passwordMatch) {
        return { email: user.email };
      }
    }

    return null;
  }

  async login(email: string) {
    const user = await this.customersService.findEmail(email);
    return {
      token: this.jwtService.sign({ email }, { subject: user.id }),
    };
  }
}
