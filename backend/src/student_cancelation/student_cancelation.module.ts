import { Module } from '@nestjs/common';
import { StudentCancelationService } from './student_cancelation.service';
import { StudentCancelationController } from './student_cancelation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentCancelation } from 'src/entities/student_cancelation.entity';
@Module({
  imports: [TypeOrmModule.forFeature([StudentCancelation])],
  controllers: [StudentCancelationController],
  providers: [StudentCancelationService],
})
export class StudentCancelationModule {}
