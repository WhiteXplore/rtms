import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('students_document_submitted')
export class StudentsDocumentSubmitted {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  fk_student_generated_id: string;

  @Column({ type: 'text', nullable: true })
  type_of_documents: string;

  @Column({ type: 'text', nullable: true })
  document_status: string;
}
