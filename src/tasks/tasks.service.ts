import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { Project } from 'src/projects/entities/project.entity';
import TaskStatusEnum from './enums/taskStatusEnum';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}
  async create(createTaskDto: CreateTaskDto) {
    try {
      const { projectId, ...taskData } = createTaskDto;
      const project = await this.projectRepository.findOneByOrFail({
        id: projectId,
      });
      const newTask = this.taskRepository.create({ ...taskData, project });
      return await this.taskRepository.save(newTask);
    } catch (error) {
      throw new BadRequestException('Error Creating Task');
    }
  }

  async findAll(
    status?: TaskStatusEnum,
    projectId?: number,
    limit: number = 10,
    page: number = 10,
  ) {
    // const tasks = await this.taskRepository.find({ relations: ['project'] });
    // return tasks;
    try {
      const query = this.taskRepository
        .createQueryBuilder('tasks')
        .leftJoinAndSelect('tasks.project', 'project');
      if (status) {
        query.where('tasks.status = :x', { x: status });
      }
      if (projectId) {
        query.where('project.id = :projectId', { projectId });
      }
      query.skip((page - 1) * limit).take(limit);
      return await query.getMany();
    } catch (error) {
      throw new BadRequestException('Error Getting Task');
    }
  }

  async findOne(id: number) {
    try {
      const task = await this.taskRepository.findOneBy({ id });
      if (!task) throw new NotFoundException(`Task with id:${id} not found`);
      return task;
    } catch (error) {
      throw new BadRequestException('Error Getting Task');
    }
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    try {
      const { projectId, ...taskData } = updateTaskDto;
      //find Task
      const task = await this.taskRepository.findOneBy({ id });
      if (!task) throw new NotFoundException('Task not found');
      //find Project
      const project = await this.projectRepository.findOneBy({
        id: projectId,
      });
      if (!project) throw new NotFoundException('Project not found');

      const updatedTask = await this.taskRepository.update(id, {
        ...taskData,
        project,
      });
      return updatedTask;
    } catch (error) {
      throw new BadRequestException('Error Updating Task');
    }
  }

  async remove(id: number) {
    try {
      const result = await this.taskRepository.delete(id);
      if (result.affected === 0) throw new NotFoundException('Task Not found');
    } catch (error) {
      throw new BadRequestException('Error Updating Task');
    }
  }
}
