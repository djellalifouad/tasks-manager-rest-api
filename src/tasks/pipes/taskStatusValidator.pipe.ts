import { BadRequestException, PipeTransform } from '@nestjs/common';
import { TaskStatus } from '../task.model';

export class TaskValidator implements PipeTransform {
  readonly allowedStatus = [
    TaskStatus.DONE,
    TaskStatus.IN_PROGRESS,
    TaskStatus.OPEN,
  ];
  transform(value: any) {
    console.log('value', value);
    value = value.toUpperCase();
    if (!this.isValid(value)) {
      throw new BadRequestException();
    }
    return value;
  }
  private isValid(status: any) {
    return this.allowedStatus.indexOf(status) !== -1;
  }
}
