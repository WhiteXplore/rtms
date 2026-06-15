import { PartialType } from '@nestjs/mapped-types';
import { CreateAdditionalRequirementDto } from './create-addtional-requirement.dto';

export class UpdateAddtionalRequirementDto extends PartialType(
  CreateAdditionalRequirementDto,
) {}
