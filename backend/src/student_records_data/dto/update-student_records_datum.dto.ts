import { PartialType } from '@nestjs/mapped-types';
import { CreateStudentRecordsDataDto } from './create-student_records_datum.dto';

export class UpdateStudentRecordsDataDto extends PartialType(
  CreateStudentRecordsDataDto,
) {}
