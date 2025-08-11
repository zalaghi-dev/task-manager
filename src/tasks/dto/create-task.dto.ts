import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import TaskStatusEnum from '../enums/taskStatusEnum';

export class CreateTaskDto {
  @IsString({ message: 'عنوان باید رشته باشد' })
  @MinLength(3, { message: 'حداقل 3 کاراکتر' })
  @IsNotEmpty({ message: 'وارد کردن عنوان الزامی است.' })
  title: string;

  @IsString({ message: 'توضیحات باید رشته باشد' })
  @MinLength(10, { message: 'حداقل 10 کاراکتر' })
  description: string;

  @IsEnum(TaskStatusEnum, { message: 'وضعیت نامعتبر است' })
  @IsOptional()
  status: TaskStatusEnum;
}
