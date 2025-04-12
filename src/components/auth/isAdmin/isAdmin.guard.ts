import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class IsAdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new ForbiddenException('Acesso negado. Usuário não autenticado.');
    }

    if (!user.isAdmin) {
      throw new ForbiddenException('Acesso negado. Permissões administrativas necessárias.');
    }

    return true;
  }
}
