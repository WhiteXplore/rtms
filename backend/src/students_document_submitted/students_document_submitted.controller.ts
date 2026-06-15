import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StudentsDocumentSubmittedService } from './students_document_submitted.service';
import { CreateStudentsDocumentSubmittedDto } from './dto/create-students_document_submitted.dto';
import { UpdateStudentsDocumentSubmittedDto } from './dto/update-students_document_submitted.dto';

@Controller('students-document-submitted')
export class StudentsDocumentSubmittedController {
  constructor(private readonly service: StudentsDocumentSubmittedService) {}

  // Create a new student document submission
  @Post('add-document')
  async createOrUpdate(
    @Body() createDtos: CreateStudentsDocumentSubmittedDto[],
  ) {
    return await this.service.createOrUpdate(createDtos);
  }

  // Retrieve all student document submissions
  @Get('get-documents')
  async findAll() {
    return await this.service.findAll();
  }

  // Retrieve a specific document submission by ID
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.service.findOne(+id); // Convert string ID to number
  }

  // Update a document submission
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateStudentsDocumentSubmittedDto,
  ) {
    return await this.service.update(+id, updateDto); // Convert string ID to number
  }

  // Delete a document submission
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.service.remove(+id); // Convert string ID to number
  }
}
