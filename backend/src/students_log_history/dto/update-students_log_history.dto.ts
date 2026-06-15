import { PartialType } from '@nestjs/mapped-types';
import { CreateStudentsLogHistoryDto } from './create-students_log_history.dto';

export class UpdateStudentsLogHistoryDto extends PartialType(CreateStudentsLogHistoryDto) {}
