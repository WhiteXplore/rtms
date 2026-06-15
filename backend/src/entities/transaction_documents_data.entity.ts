import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { TransactionLogsData } from './transaction_logs_data.entity';
@Entity('transaction_documents_requested')
export class DocumentData {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    () => TransactionLogsData,
    (transaction) => transaction.documents,
    {
      onDelete: 'CASCADE',
    },
  )
  transaction: TransactionLogsData;

  @Column()
  document: string;

  @Column()
  document_copies: number;
}
