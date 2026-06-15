import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { DocumentData } from './transaction_documents_data.entity';

@Entity()
export class TransactionLogsData {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  first_name: string;

  @Column({ nullable: true })
  middle_name: string;

  @Column({ nullable: true })
  last_name: string;

  @Column({ nullable: true })
  program_course: string;

  @Column({ nullable: true })
  status: string;

  @Column({ nullable: true })
  school_year_admitted: string;

  @Column({ nullable: true })
  semester: string;

  @Column({ nullable: true })
  purpose_of_transaction: string;

  @Column({ nullable: true })
  document_stamp: string;

  @Column({ nullable: true })
  remarks: string;

  @Column({ nullable: true })
  staff_fullname: string;

  @Column({ nullable: true })
  staff_email: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @OneToMany(() => DocumentData, (document) => document.transaction, {
    cascade: true,
  })
  documents: DocumentData[];
}
