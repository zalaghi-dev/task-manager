import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Response } from 'express';
import TaskStatusEnum from './enums/taskStatusEnum';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto, @Res() res: Response) {
    const newTask = await this.tasksService.create(createTaskDto);
    return res.status(HttpStatus.CREATED).json({
      statusCode: HttpStatus.CREATED,
      data: newTask,
      message: 'Task Created',
    });
  }

  @Get()
  async findAll(
    @Res() res: Response,
    @Query('status') status?: TaskStatusEnum,
    @Query('project') projectId?: number,
    @Query('limit') limit: number = 10,
    @Query('page') page: number = 1,
  ) {
    const task = await this.tasksService.findAll(
      status,
      projectId,
      limit,
      page,
    );
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: task,
      message: 'Task Found',
    });
  }

  @Get(':id')
  async findOne(@Res() res: Response, @Param('id') id: string) {
    const task = await this.tasksService.findOne(+id);
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: task,
      message: 'Task Found',
    });
  }

  @Patch(':id')
  async update(
    @Res() res: Response,
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    const updatedTask = await this.tasksService.update(+id, updateTaskDto);
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: updatedTask,
      message: 'Task updated!',
    });
  }

  @Delete(':id')
  async remove(@Res() res: Response, @Param('id') id: string) {
    const deleteTask = await this.tasksService.remove(+id);
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: deleteTask,
      message: 'Task deleted!',
    });
  }
}
