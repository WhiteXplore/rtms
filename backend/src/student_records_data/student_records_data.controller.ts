import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StudentRecordsDataService } from './student_records_data.service';
import { CreateStudentRecordsDataDto } from './dto/create-student_records_datum.dto';
import { UpdateStudentRecordsDataDto } from './dto/update-student_records_datum.dto';
import { StudentRecordsData } from 'src/entities/student_records_data.entity';
@Controller('student-records-data')
export class StudentRecordsDataController {
  constructor(
    private readonly studentRecordsDataService: StudentRecordsDataService,
  ) {}

  @Post('add')
  create(@Body() createStudentRecordsDatumDto: CreateStudentRecordsDataDto) {
    return this.studentRecordsDataService.create(createStudentRecordsDatumDto);
  }

  @Get('data')
  findAll(): Promise<StudentRecordsData[]> {
    return this.studentRecordsDataService.findAllStudentsRecords();
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateStudentRecordsDatumDto: UpdateStudentRecordsDataDto,
  ) {
    return this.studentRecordsDataService.update(
      +id,
      updateStudentRecordsDatumDto,
    );
  }

  @Delete(':student_records_generated_id')
  async remove(
    @Param('student_records_generated_id') studentRecordsGeneratedId: string,
  ) {
    return this.studentRecordsDataService.remove(studentRecordsGeneratedId);
  }

  // !CAN BE USE THE CODE IN THE FURE
  // @Post()
  // create(@Body() createStudentRecordsDatumDto: CreateStudentRecordsDataDto) {
  //   return this.studentRecordsDataService.create(createStudentRecordsDatumDto);
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.studentRecordsDataService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateStudentRecordsDatumDto: UpdateStudentRecordsDatumDto) {
  //   return this.studentRecordsDataService.update(+id, updateStudentRecordsDatumDto);
  // }
}
