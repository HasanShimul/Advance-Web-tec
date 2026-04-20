import { PipeTransform, BadRequestException } from '@nestjs/common';

export class StatusPipe implements PipeTransform {
  transform(value: any):'active'|'inactive' {

    if (value !== 'active' && value !== 'inactive') {
      throw new BadRequestException('Status must be active or inactive');
    }

    return value;
  }
}