import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AdditionalRequirementsService } from './addtional-requirements.service';
import { CreateAdditionalRequirementDto } from './dto/create-addtional-requirement.dto';
import { UpdateAddtionalRequirementDto } from './dto/update-addtional-requirement.dto';

@Controller('additional-requirements')
export class AdditionalRequirementsController {
  constructor(
    private readonly additionalRequirementsService: AdditionalRequirementsService,
  ) {}

  @Post('add-requirement')
  async create(
    @Body() createAdditionalRequirementDto: CreateAdditionalRequirementDto,
  ) {
    return await this.additionalRequirementsService.create(
      createAdditionalRequirementDto,
    );
  }

  @Get('get-requirement')
  async findAll() {
    return await this.additionalRequirementsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.additionalRequirementsService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateAdditionalRequirementDto: UpdateAddtionalRequirementDto,
  ) {
    return await this.additionalRequirementsService.update(
      id,
      updateAdditionalRequirementDto,
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.additionalRequirementsService.remove(id);
  }
}
