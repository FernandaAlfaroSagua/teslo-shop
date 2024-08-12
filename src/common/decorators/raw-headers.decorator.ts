import { createParamDecorator } from '@nestjs/common';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';

export const RawHeaders = createParamDecorator(
  (data, context: ExecutionContextHost) => {
    const request = context.switchToHttp().getRequest();
    return request.rawHeaders;
  },
);
