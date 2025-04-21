import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async validateUser(cpf: string, password: string, userType: 'PATIENT' | 'PROFESSIONAL') {
    let user;

    if (userType === 'PATIENT') {
      user = await this.prisma.patient.findUnique({ where: { cpf } });
    } else {
      user = await this.prisma.healthProfessional.findUnique({ where: { cpf } });
    }

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('CPF ou senha inválidos');
    }

    const { password: _, ...userData } = user;
    return { ...userData, userType };
  }

  async login(user: any) {
    const payload = {
      sub: user.id,
      cpf: user.cpf,
      isAdmin: user.isAdmin,
      professionalType: user.professionalType,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
