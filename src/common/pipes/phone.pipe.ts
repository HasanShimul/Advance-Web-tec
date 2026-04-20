import { PipeTransform, BadRequestException } from '@nestjs/common';

export class PhonePipe implements PipeTransform {
  transform(value: string) {

    if (!/^\d+$/.test(value)) {
      throw new BadRequestException('Phone must contain numbers only');
    }

    return BigInt(value);
  }
}