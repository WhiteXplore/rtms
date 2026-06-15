import { IsNotEmpty, IsString } from 'class-validator';

export class CreateStudentsDocumentSubmittedDto {
  @IsNotEmpty()
  @IsString()
  fk_student_generated_id: string;

  @IsNotEmpty()
  @IsString()
  documents: string;

  @IsNotEmpty()
  @IsString()
  type_of_documents: string;

  @IsNotEmpty()
  @IsString()
  document_status: string;
}
