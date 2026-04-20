import { PipeTransform } from '@nestjs/common';
export declare class PhonePipe implements PipeTransform {
    transform(value: string): bigint;
}
