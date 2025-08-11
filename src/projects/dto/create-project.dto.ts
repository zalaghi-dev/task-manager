import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import ProjectStatusEnum from '../enums/projectStatusEnum';

export class CreateProjectDto {
  @IsNotEmpty({ message: 'نام پروژه نمیتواند خالی باشد' })
  @IsString({ message: 'نام پروژه باید یک رشته باشد' })
  name: string;

  @IsEnum(ProjectStatusEnum, { message: 'وضعیت پروژه نامعتبر است.' })
  status: ProjectStatusEnum;
}
