import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class StudentRecordsData {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: true })
  student_records_generated_id: string;

  @Column({ nullable: true })
  student_id: string;

  @Column({ nullable: true })
  first_name?: string;

  @Column({ nullable: true })
  middle_name?: string;

  @Column({ nullable: true })
  last_name?: string;

  @Column({ nullable: true })
  program_course?: string;

  @Column({ nullable: true })
  current_level?: string;

  @Column({ nullable: true })
  status?: string;

  @Column({ type: 'date', nullable: true })
  birthdate?: Date;

  @Column({ nullable: true })
  educational_level?: string;

  @Column({ nullable: true })
  civil_status?: string;

  @Column({ nullable: true })
  semester?: string;

  @Column({ nullable: true })
  school_year_admitted?: string;

  @Column({ nullable: true })
  enrollment_status?: string;

  @Column({ nullable: true })
  last_school_attended?: string;

  @Column({ nullable: true })
  address_last_school_attended?: string;

  @Column({ nullable: true })
  strand_course?: string;

  @Column({ nullable: true })
  s_y_last_attended?: string;

  @Column({ nullable: true })
  gender?: string;

  @Column({ nullable: true })
  lrn?: string;

  @Column({ nullable: true })
  enrollment_category?: string;

  @Column({ nullable: true })
  remakrs?: string;

  @Column({ nullable: true })
  to_submit?: string;

  @Column({ nullable: true })
  staff?: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
