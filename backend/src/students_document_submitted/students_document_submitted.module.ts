import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentsDocumentSubmittedService } from './students_document_submitted.service';
import { StudentsDocumentSubmittedController } from './students_document_submitted.controller';
import { StudentsDocumentSubmitted } from 'src/entities/students_document_submitted.entity';
@Module({
  imports: [TypeOrmModule.forFeature([StudentsDocumentSubmitted])],
  controllers: [StudentsDocumentSubmittedController],
  providers: [StudentsDocumentSubmittedService],
})
export class StudentsDocumentSubmittedModule {}
