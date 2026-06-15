import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdditionalRequirement } from 'src/entities/addtional-requirement.entity';
import { CreateAdditionalRequirementDto } from './dto/create-addtional-requirement.dto';
import { UpdateAddtionalRequirementDto } from './dto/update-addtional-requirement.dto';

@Injectable()
export class AdditionalRequirementsService {
  constructor(
    @InjectRepository(AdditionalRequirement)
    private readonly additionalRequirementRepository: Repository<AdditionalRequirement>,
  ) {}

  async create(createAdditionalRequirementDto: CreateAdditionalRequirementDto) {
    const newRequirement = this.additionalRequirementRepository.create(
      createAdditionalRequirementDto,
    );
    return await this.additionalRequirementRepository.save(newRequirement);
  }

  async findAll() {
    return await this.additionalRequirementRepository.find();
  }

  async findOne(id: number) {
    const requirement = await this.additionalRequirementRepository.findOne({
      where: { id },
    });
    if (!requirement) {
      throw new NotFoundException(
        `AdditionalRequirement with ID ${id} not found`,
      );
    }
    return requirement;
  }

  async update(
    id: number,
    updateAdditionalRequirementDto: UpdateAddtionalRequirementDto,
  ) {
    const existingRequirement = await this.findOne(id);
    Object.assign(existingRequirement, updateAdditionalRequirementDto);
    return await this.additionalRequirementRepository.save(existingRequirement);
  }

  async remove(id: number) {
    const result = await this.additionalRequirementRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(
        `AdditionalRequirement with ID ${id} not found`,
      );
    }
    return { message: 'Deleted successfully' };
  }
}
