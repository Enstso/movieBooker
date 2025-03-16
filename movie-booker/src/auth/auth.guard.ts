import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  OnModuleInit,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IS_PUBLIC_KEY, jwtConstants } from './constants';
import { Request } from 'express';
import { Reflector, ModuleRef } from '@nestjs/core';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthGuard implements CanActivate, OnModuleInit {
  private usersService: UsersService;

  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
    private moduleRef: ModuleRef, // Injecter ModuleRef pour récupérer UsersService
  ) {}

  onModuleInit() {
    this.usersService = this.moduleRef.get(UsersService, { strict: false });
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });

      const user = await this.usersService.findById(payload.sub); // Récupérer l'utilisateur
      if (!user) {
        throw new UnauthorizedException();
      }

      request['user'] = user; // Stocker l'utilisateur dans la requête
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
