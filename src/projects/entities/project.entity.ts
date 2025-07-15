import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import StatusEnum from '../enums/statusEnum';

@Entity({ name: 'projects' })
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'enum', enum: StatusEnum, default: StatusEnum.Enabale })
  status: StatusEnum;
}
