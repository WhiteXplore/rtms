import { IsString } from 'class-validator';
export class CreateStudentCancelationDto {
  @IsString()
  fk_student_generated_id: string;

  @IsString()
  fullname: string;

  @IsString()
  program_course: string;

  @IsString()
  year_level: string;

  @IsString()
  applied_for: string;

  @IsString()
  semester: string;

  @IsString()
  school_year: string;

  @IsString()
  reason: string;
}
