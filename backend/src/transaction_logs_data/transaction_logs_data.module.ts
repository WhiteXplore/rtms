import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionLogsDataService } from './transaction_logs_data.service';
import { TransactionLogsDataController } from './transaction_logs_data.controller';
import { TransactionLogsData } from 'src/entities/transaction_logs_data.entity';
import { DocumentData } from 'src/entities/transaction_documents_data.entity';
@Module({
  imports: [TypeOrmModule.forFeature([TransactionLogsData, DocumentData])],
  controllers: [TransactionLogsDataController],
  providers: [TransactionLogsDataService],
  exports: [TypeOrmModule],
})
export class TransactionLogsDataModule {}
