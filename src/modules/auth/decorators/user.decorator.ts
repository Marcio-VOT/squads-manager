import {
  ExecutionContext,
  NotFoundException,
  createParamDecorator,
} from '@nestjs/common';

/**
 * A decorator that retrieves the authenticated user from the request object.
 * Throws a NotFoundException if the user is not found.
 * @param data - Optional parameter to specify additional data.
 * @param context - The execution context.
 * @returns The authenticated user from the request object.
 * @throws NotFoundException if the user is not found.
 */
export const UserRequest = createParamDecorator(
  (data: string, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    if (!request.user) throw new NotFoundException('User not found.');
    return request.user;
  },
);
