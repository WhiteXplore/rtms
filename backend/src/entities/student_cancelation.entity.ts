import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('student_cancellation')
export class StudentCancelation {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: true, length: 255 })
  fk_student_generated_id: string;

  @Column({ nullable: true })
  fullname: string;

  @Column({ nullable: true })
  program_course: string;

  @Column({ nullable: true })
  year_level: string;

  @Column({ nullable: true })
  applied_for: string;

  @Column({ nullable: true })
  semester: string;

  @Column({ nullable: true })
  school_year: string;

  @Column({ nullable: true })
  reason: string;
}
