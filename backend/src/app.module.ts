import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentRecordsDataModule } from './student_records_data/student_records_data.module';
import { TransactionLogsDataModule } from './transaction_logs_data/transaction_logs_data.module';
import { AuthModule } from './auth/auth.module';
import { StudentsDocumentSubmittedModule } from './students_document_submitted/students_document_submitted.module';
import { AddtionalRequirementsModule } from './additional-requirements/addtional-requirements.module';
import { StudentsLogHistoryModule } from './students_log_history/students_log_history.module';
import { StudentCancelationModule } from './student_cancelation/student_cancelation.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.2',
      port: 3306,
      username: 'root',
      password: 'admin12345..',
      database: 'rtms',
      entities: [__dirname + '/entities/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    StudentRecordsDataModule,
    TransactionLogsDataModule,
    AuthModule,
    StudentsDocumentSubmittedModule,
    AddtionalRequirementsModule,
    StudentsLogHistoryModule,
    StudentCancelationModule,
  ],
})
export class AppModule {}
