import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Put,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import ProjectStatusEnum from './enums/projectStatusEnum';
import { Response } from 'express';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.create(createProjectDto);
  }

  @Get()
  async findAll(
    @Res() res: Response,
    @Query('status') status?: ProjectStatusEnum,
    @Query('limit') limit: number = 10,
    @Query('page') page: number = 1,
  ) {
    const projects = await this.projectsService.findAll(status, limit, page);
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: projects,
      message: 'Projects found!',
    });
  }

  @Get(':id')
  async findOne(@Res() res: Response, @Param('id') id: string) {
    const project = await this.projectsService.findOne(+id);
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: project,
      message: 'Project found!',
    });
  }

  @Put(':id')
  async update(
    @Res() res: Response,
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    const updatedProject = await this.projectsService.update(
      +id,
      updateProjectDto,
    );
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: updatedProject,
      message: 'Project updated!',
    });
  }

  @Delete(':id')
  async remove(@Res() res: Response, @Param('id') id: string) {
    const deletedProject = await this.projectsService.remove(+id);
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: deletedProject,
      message: 'Project deleted!',
    });
  }
}
