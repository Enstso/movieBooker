import { SetMetadata  } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

export const jwtConstants = {
    secret: process.env.JWT_SECRET,
  };
  
export const IS_PUBLIC_KEY = 'isPublic';

export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

export const Roles = Reflector.createDecorator<string[]>();
