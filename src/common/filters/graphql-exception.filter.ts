import { Catch, ExceptionFilter, ArgumentsHost, ConflictException, NotFoundException } from '@nestjs/common';
import { GqlArgumentsHost } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';

@Catch()
export class GraphQLExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const gqlHost = GqlArgumentsHost.create(host);

    let message = 'Lỗi không xác định';
    let code = 'INTERNAL_SERVER_ERROR';

    if (exception instanceof GraphQLError) {
      return exception;
    }

    if (exception instanceof NotFoundException) {
      message = exception.message;
      code = 'NOT_FOUND';
    } else if (exception instanceof ConflictException) {
      message = exception.message;
      code = 'CONFLICT';
    } else {
      message = 'Lỗi server';
    }

    throw new GraphQLError(message, {
      extensions: {
        code,
      },
    });
  }
}