import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import {
  CustomForbiddenException,
  PERMISSION_KEY,
  RequestWithUser,
} from 'src/common';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(
      PERMISSION_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredPermissions || requiredPermissions.length === 0) return true;

    const { user } = context.switchToHttp().getRequest<RequestWithUser>();
    const userPermissions: string[] = Array.isArray(user.permission)
      ? user.permission
      : [];

    const hasPermissions = requiredPermissions.every((p) =>
      userPermissions.includes(p),
    );

    if (!hasPermissions) {
      throw new CustomForbiddenException(
        'Access denied: Insufficient permissions',
      );
    }

    return true;
  }
}
