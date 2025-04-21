import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';

@Injectable()
export class IsProfessionalGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new ForbiddenException('Acesso negado. Usuário não autenticado.');
    }

    if (user.professionalType === undefined) {
      throw new ForbiddenException('Acesso negado. Apenas profissionais de saúde');
    }

    return true;
  }
}
