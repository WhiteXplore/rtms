import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not } from 'typeorm';
import { TransactionLogsData } from 'src/entities/transaction_logs_data.entity';
import { DocumentData } from 'src/entities/transaction_documents_data.entity';
import { UpdateTransactionLogsDataDto } from './dto/update-transaction_logs_datum.dto';
@Injectable()
export class TransactionLogsDataService {
  constructor(
    @InjectRepository(TransactionLogsData)
    private transactionLogsRepository: Repository<TransactionLogsData>,
    @InjectRepository(DocumentData)
    private documentRepository: Repository<DocumentData>,
  ) {}

  async createTransaction(data: any) {
    // First, create the transaction entity
    const transaction = this.transactionLogsRepository.create({
      first_name: data.first_name,
      middle_name: data.middle_name,
      last_name: data.last_name,
      program_course: data.program_course,
      status: data.status,
      school_year_admitted: data.school_year_admitted,
      semester: data.semester,
      purpose_of_transaction: data.purpose_of_transaction,
      document_stamp: data.document_stamp,
      remarks: data.remarks,
      staff_fullname: data.staff_fullname,
      staff_email: data.staff_email,
    });

    // Save the transaction to the database
    const savedTransaction =
      await this.transactionLogsRepository.save(transaction);

    // Now create and save the associated documents
    const documentPromises = data.documents.map(async (doc: any) => {
      const documentData = this.documentRepository.create({
        document: doc.document,
        document_copies: parseInt(doc.document_copies, 10), // Ensure document_copies is an integer
        transaction: savedTransaction, // Link the document to the saved transaction
      });
      return this.documentRepository.save(documentData);
    });

    // Wait for all documents to be saved
    await Promise.all(documentPromises);

    return {
      message: 'Transaction and documents saved successfully',
      savedTransaction,
    };
  }

  async findAllTransactionLogs(): Promise<TransactionLogsData[]> {
    return await this.transactionLogsRepository
      .createQueryBuilder('transactionLogsDatum')
      .leftJoinAndSelect('transactionLogsDatum.documents', 'documentData') // Join the related documents table
      .where('transactionLogsDatum.first_name IS NOT NULL')
      .getMany();
  }

  // Get a single transaction logs by ID
  async findOne(id: number): Promise<TransactionLogsData> {
    const transaction = await this.transactionLogsRepository.findOne({
      where: { id },
    });
    if (!transaction) {
      throw new NotFoundException(`Transaction Logs with ID ${id} not found`);
    }
    return transaction;
  }

  // Delete a transaction record
  async remove(id: number): Promise<{ message: string }> {
    const transaction_record = await this.findOne(id);
    if (!transaction_record) {
      throw new NotFoundException(`transaction_record with ID ${id} not found`);
    }
    await this.transactionLogsRepository.remove(transaction_record);
    return { message: `transaction_record with ID ${id} deleted successfully` };
  }

  /** 🔹 Update an existing transaction */
  async update(
    id: number,
    updateTransactionLogsDataDto: UpdateTransactionLogsDataDto,
  ): Promise<TransactionLogsData> {
    const record = await this.findOne(id);
    Object.assign(record, updateTransactionLogsDataDto);
    return await this.transactionLogsRepository.save(record);
  }
}
