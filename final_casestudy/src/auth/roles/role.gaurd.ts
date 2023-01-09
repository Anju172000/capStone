
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Console } from 'console';
import { Observable } from 'rxjs';
import { Role } from './role.enum';

@Injectable()
export class RolesGuard implements CanActivate {


    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
          context.getHandler(),
          context.getClass(),
        ]);
        if (!requiredRoles) {
          return true;
        }
        const { user } = context.switchToHttp().getRequest();
        return requiredRoles.some((role) => user?.roles?.includes(role));
      }
    
}
