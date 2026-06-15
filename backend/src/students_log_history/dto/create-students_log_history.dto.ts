import { IsOptional, IsString } from 'class-validator';

export class CreateStudentsLogHistoryDto {
  @IsOptional()
  @IsString()
  fk_student_generated_id;

  @IsOptional()
  @IsString()
  staff_name?: string;

  @IsOptional()
  @IsString()
  action_id?: string;
}
