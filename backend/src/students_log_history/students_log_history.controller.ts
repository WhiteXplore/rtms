import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { StudentsLogHistoryService } from './students_log_history.service';
import { CreateStudentsLogHistoryDto } from './dto/create-students_log_history.dto';
import { UpdateStudentsLogHistoryDto } from './dto/update-students_log_history.dto';

@Controller('students-log-history')
export class StudentsLogHistoryController {
  constructor(
    private readonly studentsLogHistoryService: StudentsLogHistoryService,
  ) {}

  @Post('add-log')
  create(@Body() createStudentsLogHistoryDto: CreateStudentsLogHistoryDto) {
    return this.studentsLogHistoryService.create(createStudentsLogHistoryDto);
  }

  @Get('get-log')
  findAll() {
    return this.studentsLogHistoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.studentsLogHistoryService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateStudentsLogHistoryDto: UpdateStudentsLogHistoryDto,
  ) {
    return this.studentsLogHistoryService.update(
      id,
      updateStudentsLogHistoryDto,
    );
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.studentsLogHistoryService.remove(id);
  }
}
