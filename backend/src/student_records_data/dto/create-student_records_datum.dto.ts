import { IsString, IsInt, IsDate, IsOptional } from 'class-validator';

export class CreateStudentRecordsDataDto {
  @IsOptional()
  @IsInt()
  id?: number;

  @IsOptional()
  @IsString()
  student_records_generated_id?: string;

  @IsOptional()
  @IsString()
  student_id?: string;

  @IsOptional()
  @IsString()
  first_name?: string;

  @IsOptional()
  @IsString()
  middle_name?: string;

  @IsOptional()
  @IsString()
  last_name?: string;

  @IsOptional()
  @IsString()
  program_course?: string;

  @IsOptional()
  @IsString()
  current_level?: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsDate()
  birthdate?: Date;

  @IsOptional()
  @IsString()
  educational_level?: string;

  @IsOptional()
  @IsString()
  civil_status?: string;

  @IsOptional()
  @IsString()
  semester?: string;

  @IsOptional()
  @IsString()
  school_year_admitted?: string;

  @IsOptional()
  @IsString()
  enrollment_status?: string;

  @IsOptional()
  @IsString()
  last_school_attended?: string;

  @IsOptional()
  @IsString()
  address_last_school_attended?: string;

  @IsOptional()
  @IsString()
  strand_course?: string;

  @IsOptional()
  @IsString()
  s_y_last_attended?: string;

  @IsOptional()
  @IsString()
  gender?: string;

  @IsOptional()
  @IsString()
  lrn?: string;

  @IsOptional()
  @IsString()
  enrollment_category?: string;

  @IsOptional()
  @IsString()
  remakrs?: string;

  @IsOptional()
  @IsString()
  to_submit?: string;
}
