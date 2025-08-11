import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import TaskStatusEnum from '../enums/taskStatusEnum';
import { Project } from 'src/projects/entities/project.entity';

@Entity({ name: 'tasks' })
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({
    type: 'enum',
    enum: TaskStatusEnum,
    default: TaskStatusEnum.Set,
  })
  status: TaskStatusEnum;

  @ManyToOne(() => Project, (project) => project.tasks)
  project: Project;
}
