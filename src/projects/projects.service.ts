import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { Repository } from 'typeorm';
import ProjectStatusEnum from './enums/projectStatusEnum';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    try {
      const newProject = this.projectRepository.create(createProjectDto);
      return await this.projectRepository.save(newProject);
    } catch (error) {
      throw new BadRequestException('Error Creating Project');
    }
  }

  async findAll(
    status?: ProjectStatusEnum,
    limit: number = 10,
    page: number = 10,
  ) {
    try {
      const query = this.projectRepository.createQueryBuilder('projects');
      if (status) {
        query.where('status = :x', { x: status });
      }
      query.skip((page - 1) * limit).take(limit);
      return await query.getMany();
    } catch (error) {
      throw new BadRequestException('Error Getting Project');
    }
  }

  async findOne(id: number) {
    try {
      const project = await this.projectRepository.findOneBy({ id });
      if (!project) throw new NotFoundException('Project is not found');
      return project;
    } catch (error) {
      throw new BadRequestException('Error Getting Project');
    }
  }

  async update(id: number, updateProjectDto: UpdateProjectDto) {
    try {
      const project = await this.projectRepository.findOneBy({ id });
      if (!project) throw new NotFoundException('Project not found');
      const updateProject = await this.projectRepository.update(
        id,
        updateProjectDto,
      );
      return updateProject;
    } catch (error) {
      throw new BadRequestException('Error Updating Project');
    }
  }

  async remove(id: number) {
    try {
      const result = await this.projectRepository.delete(id);
      if (result.affected === 0)
        throw new NotFoundException('Project Not found');
    } catch (error) {
      throw new BadRequestException('Error Updating Project');
    }
  }
}
