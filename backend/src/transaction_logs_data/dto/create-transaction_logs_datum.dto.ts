import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class DocumentDto {
  @IsString()
  @IsNotEmpty()
  document: string;

  @IsString()
  @IsNotEmpty()
  document_copies: string;
}

export class CreateTransactionLogsDataDto {
  @IsString()
  first_name: string;

  @IsOptional()
  @IsString()
  middle_name?: string;

  @IsString()
  last_name: string;

  @IsString()
  program_course: string;

  @IsString()
  status: string;

  @IsString()
  school_year_admitted: string;

  @IsString()
  semester: string;

  @IsString()
  purpose_of_transaction: string;

  @IsString()
  staff_fullname: string;

  @IsString()
  staff_email: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DocumentDto)
  documents?: DocumentDto[];

  @IsString()
  document_stamp: string;

  @IsString()
  document_copies: string;

  @IsString()
  remarks: string;
}
