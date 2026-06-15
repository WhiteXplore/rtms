import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentRecordsData } from 'src/entities/student_records_data.entity';
import { StudentRecordsDataService } from './student_records_data.service';
import { StudentRecordsDataController } from './student_records_data.controller';
import { StudentsDocumentSubmitted } from 'src/entities/students_document_submitted.entity';
import { StudentsLogHistory } from 'src/entities/students_log_history.entity';
import { AdditionalRequirement } from 'src/entities/addtional-requirement.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([
      StudentRecordsData,
      StudentsDocumentSubmitted,
      StudentsLogHistory,
      AdditionalRequirement,
    ]),
  ],
  controllers: [StudentRecordsDataController],
  providers: [StudentRecordsDataService],
  exports: [TypeOrmModule],
})
export class StudentRecordsDataModule {}
