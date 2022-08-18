import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/createTast.dto';
import { FilterTasksDto } from './dto/get-tasks.dto';
import { TaskValidator } from './pipes/taskStatusValidator.pipe';
@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}
  @Get()
  getAllTasks(@Query(ValidationPipe) filterDto: FilterTasksDto): Task[] {
    if (Object.keys(filterDto).length) {
      return this.tasksService.getAllTasksFiltred(filterDto);
    }
    return this.tasksService.getAllTasks();
  }
  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.createTask(createTaskDto);
  }
  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    return this.tasksService.getTaskById(id);
  }
  @Delete('/:id')
  removeTaskById(@Param('id') id: string) {
    return this.tasksService.removeById(id);
  }
  @Patch('/:id/status')
  updateTaskStatusById(
    @Param('id') id: string,
    @Body('status', TaskValidator) status: TaskStatus,
  ) {
    return this.tasksService.updateTaskStatusById(id, status);
  }
}
