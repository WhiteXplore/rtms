import { IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateAdditionalRequirementDto {
  @IsOptional()
  @IsString()
  @MaxLength(255)
  additional_document_name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  fk_student_generated_id: string;
}
