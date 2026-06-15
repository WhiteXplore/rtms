import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';

@Entity()
export class StudentsLogHistory {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: true, length: 255 })
  fk_student_generated_id: string;

  @Column({ nullable: true, length: 255 })
  staff_name: string;

  @Column({ nullable: true, length: 255 })
  action_did: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  added_on: Date;

  @BeforeInsert()
  setAddedOnDate() {
    this.added_on = new Date();
  }
}
