import { Module } from '@nestjs/common';
import { AdditionalRequirementsService } from './addtional-requirements.service';
import { AdditionalRequirementsController } from './addtional-requirements.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdditionalRequirement } from '../entities/addtional-requirement.entity';
@Module({
  imports: [TypeOrmModule.forFeature([AdditionalRequirement])],
  controllers: [AdditionalRequirementsController],
  providers: [AdditionalRequirementsService],
})
export class AddtionalRequirementsModule {}
