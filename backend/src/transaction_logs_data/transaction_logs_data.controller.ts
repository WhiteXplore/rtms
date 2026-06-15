import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  Put,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { TransactionLogsDataService } from './transaction_logs_data.service';
import { CreateTransactionLogsDataDto } from './dto/create-transaction_logs_datum.dto';
import { UpdateTransactionLogsDataDto } from './dto/update-transaction_logs_datum.dto';
import { TransactionLogsData } from 'src/entities/transaction_logs_data.entity';

@Controller('transaction-logs-data')
export class TransactionLogsDataController {
  constructor(
    private readonly transactionLogsDataService: TransactionLogsDataService,
  ) {}

  @Post('add-transaction-logs')
  async createTransactionLog(@Body() transactionData: any) {
    return this.transactionLogsDataService.createTransaction(transactionData);
  }

  @Get('get-transaction-logs')
  findAll(): Promise<TransactionLogsData[]> {
    return this.transactionLogsDataService.findAllTransactionLogs();
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.transactionLogsDataService.remove(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTransactionLogsDataDto: UpdateTransactionLogsDataDto,
  ) {
    return this.transactionLogsDataService.update(
      +id,
      updateTransactionLogsDataDto,
    );
  }
}
