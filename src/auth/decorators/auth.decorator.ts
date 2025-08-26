import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UserAccount } from '@prisma/client';

// Định nghĩa interface cho Request với user_data
interface GqlRequest {
  user_data?: UserAccount; // user_data khớp với kiểu User
}

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): UserAccount | undefined => {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext<{ req: GqlRequest }>().req;
    return req.user_data;
  },
);