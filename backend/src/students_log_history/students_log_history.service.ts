import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudentsLogHistory } from 'src/entities/students_log_history.entity';
import { CreateStudentsLogHistoryDto } from './dto/create-students_log_history.dto';
import { UpdateStudentsLogHistoryDto } from './dto/update-students_log_history.dto';

@Injectable()
export class StudentsLogHistoryService {
  constructor(
    @InjectRepository(StudentsLogHistory)
    private readonly studentsLogHistoryRepository: Repository<StudentsLogHistory>,
  ) {}

  async create(
    createDto: CreateStudentsLogHistoryDto,
  ): Promise<StudentsLogHistory> {
    const newLog = this.studentsLogHistoryRepository.create(createDto);
    return await this.studentsLogHistoryRepository.save(newLog);
  }

  async findAll(): Promise<StudentsLogHistory[]> {
    return await this.studentsLogHistoryRepository.find();
  }

  async findOne(id: number): Promise<StudentsLogHistory> {
    const log = await this.studentsLogHistoryRepository.findOne({
      where: { id },
    });
    if (!log) {
      throw new NotFoundException(`Log with ID ${id} not found`);
    }
    return log;
  }

  async update(
    id: number,
    updateDto: UpdateStudentsLogHistoryDto,
  ): Promise<StudentsLogHistory> {
    const log = await this.findOne(id);
    Object.assign(log, updateDto);
    return await this.studentsLogHistoryRepository.save(log);
  }

  async remove(id: number): Promise<{ message: string }> {
    const log = await this.findOne(id);
    await this.studentsLogHistoryRepository.remove(log);
    return { message: `Log with ID ${id} removed successfully` };
  }
}
