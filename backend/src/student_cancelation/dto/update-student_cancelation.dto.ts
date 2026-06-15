import { PartialType } from '@nestjs/mapped-types';
import { CreateStudentCancelationDto } from './create-student_cancelation.dto';

export class UpdateStudentCancelationDto extends PartialType(CreateStudentCancelationDto) {}
