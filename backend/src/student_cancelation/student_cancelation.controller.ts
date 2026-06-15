import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StudentCancelationService } from './student_cancelation.service';
import { CreateStudentCancelationDto } from './dto/create-student_cancelation.dto';
import { UpdateStudentCancelationDto } from './dto/update-student_cancelation.dto';

@Controller('student-cancellation')
export class StudentCancelationController {
  constructor(
    private readonly studentCancelationService: StudentCancelationService,
  ) {}

  @Post('add-cancellation')
  create(@Body() createStudentCancelationDto: CreateStudentCancelationDto) {
    return this.studentCancelationService.create(createStudentCancelationDto);
  }
  @Get()
  findAll() {
    return this.studentCancelationService.findAll();
  }
}
