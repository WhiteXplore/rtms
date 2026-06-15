import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudentsDocumentSubmitted } from 'src/entities/students_document_submitted.entity';
import { CreateStudentsDocumentSubmittedDto } from './dto/create-students_document_submitted.dto';
import { UpdateStudentsDocumentSubmittedDto } from './dto/update-students_document_submitted.dto';

@Injectable()
export class StudentsDocumentSubmittedService {
  constructor(
    @InjectRepository(StudentsDocumentSubmitted)
    private readonly studentsDocumentSubmittedRepository: Repository<StudentsDocumentSubmitted>,
  ) {}

  // Create a new document submission
  async createOrUpdate(createDtos: CreateStudentsDocumentSubmittedDto[]) {
    const updatedDocuments: StudentsDocumentSubmitted[] = [];

    for (const dto of createDtos) {
      const existingDocument =
        await this.studentsDocumentSubmittedRepository.findOne({
          where: {
            fk_student_generated_id: dto.fk_student_generated_id,
            type_of_documents: dto.type_of_documents,
          },
        });

      if (existingDocument) {
        // Update existing document
        existingDocument.document_status = dto.document_status;
        await this.studentsDocumentSubmittedRepository.save(existingDocument);
        updatedDocuments.push(existingDocument);
      } else {
        // Insert new document
        const newDocument =
          this.studentsDocumentSubmittedRepository.create(dto);
        await this.studentsDocumentSubmittedRepository.save(newDocument);
        updatedDocuments.push(newDocument);
      }
    }

    return updatedDocuments;
  }

  // Retrieve all submitted documents
  async findAll() {
    return await this.studentsDocumentSubmittedRepository.find();
  }

  // Retrieve a specific document by ID
  async findOne(id: number) {
    const document = await this.studentsDocumentSubmittedRepository.findOne({
      where: { id },
    });
    if (!document) {
      throw new NotFoundException(`Document with ID ${id} not found`);
    }
    return document;
  }

  // Update an existing document submission
  async update(id: number, updateDto: UpdateStudentsDocumentSubmittedDto) {
    const document = await this.findOne(id);
    Object.assign(document, updateDto);
    return await this.studentsDocumentSubmittedRepository.save(document);
  }

  // Delete a document submission
  async remove(id: number) {
    const result = await this.studentsDocumentSubmittedRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Document with ID ${id} not found`);
    }
    return { message: `Document with ID ${id} deleted successfully` };
  }
}
