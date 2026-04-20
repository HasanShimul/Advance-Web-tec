import { PipeTransform } from '@nestjs/common';
export declare class StatusPipe implements PipeTransform {
    transform(value: any): 'active' | 'inactive';
}
