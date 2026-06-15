import { PartialType } from '@nestjs/mapped-types';
import { CreateTransactionLogsDataDto } from './create-transaction_logs_datum.dto';

export class UpdateTransactionLogsDataDto extends PartialType(
  CreateTransactionLogsDataDto,
) {}
