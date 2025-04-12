export class LoginDto {
    cpf: string;
    password: string;
    userType: 'PATIENT' | 'PROFESSIONAL';
  }