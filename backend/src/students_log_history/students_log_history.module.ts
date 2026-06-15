import { Module } from '@nestjs/common';
import { StudentsLogHistoryService } from './students_log_history.service';
import { StudentsLogHistoryController } from './students_log_history.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentsLogHistory } from 'src/entities/students_log_history.entity';
@Module({
  imports: [TypeOrmModule.forFeature([StudentsLogHistory])],
  controllers: [StudentsLogHistoryController],
  providers: [StudentsLogHistoryService],
})
export class StudentsLogHistoryModule {}
