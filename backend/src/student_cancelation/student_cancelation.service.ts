import { Injectable } from '@nestjs/common';
import { CreateStudentCancelationDto } from './dto/create-student_cancelation.dto';
import { UpdateStudentCancelationDto } from './dto/update-student_cancelation.dto';
import { StudentCancelation } from 'src/entities/student_cancelation.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class StudentCancelationService {
  constructor(
    @InjectRepository(StudentCancelation)
    private readonly studentCancelationRepository: Repository<StudentCancelation>,
  ) {}

  async create(
    createStudentCancelationDto: CreateStudentCancelationDto,
  ): Promise<StudentCancelation> {
    const newCancelation = this.studentCancelationRepository.create(
      createStudentCancelationDto,
    );
    return await this.studentCancelationRepository.save(newCancelation);
  }

  async findAll(): Promise<StudentCancelation[]> {
    return this.studentCancelationRepository.find();
  }
}
