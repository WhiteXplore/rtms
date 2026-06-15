import { PartialType } from '@nestjs/mapped-types';
import { CreateStudentsDocumentSubmittedDto } from './create-students_document_submitted.dto';

export class UpdateStudentsDocumentSubmittedDto extends PartialType(
  CreateStudentsDocumentSubmittedDto,
) {}
