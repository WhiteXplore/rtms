import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStudentRecordsDataDto } from './dto/create-student_records_datum.dto';
import { UpdateStudentRecordsDataDto } from './dto/update-student_records_datum.dto';
import { StudentRecordsData } from 'src/entities/student_records_data.entity';
import { StudentsDocumentSubmitted } from 'src/entities/students_document_submitted.entity';
import { StudentsLogHistory } from 'src/entities/students_log_history.entity';
import { AdditionalRequirement } from 'src/entities/addtional-requirement.entity';
@Injectable()
export class StudentRecordsDataService {
  constructor(
    @InjectRepository(StudentRecordsData)
    private studentRecordsRepository: Repository<StudentRecordsData>,
    @InjectRepository(StudentsDocumentSubmitted)
    private documentRepository: Repository<StudentsDocumentSubmitted>,
    @InjectRepository(StudentsLogHistory)
    private logHistoryRepository: Repository<StudentsLogHistory>,
    @InjectRepository(AdditionalRequirement)
    private additionalRquirementRepository: Repository<AdditionalRequirement>,
  ) {}

  // Get all student records
  async findAllStudentsRecords(): Promise<StudentRecordsData[]> {
    return await this.studentRecordsRepository.find();
  }

  // Get a single student record by ID
  async findOne(id: number): Promise<StudentRecordsData> {
    const record = await this.studentRecordsRepository.findOne({
      where: { id },
    });
    if (!record) {
      throw new NotFoundException(`Student record with ID ${id} not found`);
    }
    return record;
  }

  // Create a new student record
  async create(
    createStudentRecordsDataDto: CreateStudentRecordsDataDto,
  ): Promise<StudentRecordsData> {
    const newRecord = this.studentRecordsRepository.create(
      createStudentRecordsDataDto,
    );
    return await this.studentRecordsRepository.save(newRecord);
  }

  // Update a student record
  async update(
    id: number,
    updateStudentRecordsDataDto: UpdateStudentRecordsDataDto,
  ): Promise<StudentRecordsData> {
    const record = await this.findOne(id);
    Object.assign(record, updateStudentRecordsDataDto);
    return await this.studentRecordsRepository.save(record);
  }

  // Delete a student record
  async remove(
    student_records_generated_id: string,
  ): Promise<{ message: string }> {
    const record = await this.studentRecordsRepository.findOne({
      where: { student_records_generated_id },
    });

    if (!record) {
      throw new NotFoundException(
        `Student record with generated ID ${student_records_generated_id} not found`,
      );
    }

    // Find and delete related documents with the same fk_student_generated_id
    await this.documentRepository.delete({
      fk_student_generated_id: student_records_generated_id,
    });

    await this.logHistoryRepository.delete({
      fk_student_generated_id: student_records_generated_id,
    });

    await this.additionalRquirementRepository.delete({
      fk_student_generated_id: student_records_generated_id,
    });

    // Remove student record
    await this.studentRecordsRepository.remove(record);

    return {
      message: `Student record and related documents with generated ID ${student_records_generated_id} deleted successfully`,
    };
  }
}
