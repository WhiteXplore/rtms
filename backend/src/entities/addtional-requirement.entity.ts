import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';

@Entity()
export class AdditionalRequirement {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: true, length: 255 })
  fk_student_generated_id: string;

  @Column({ nullable: true, length: 255 })
  additional_document_name: string;

  @Column({ type: 'timestamp' })
  added_on: Date;

  @BeforeInsert()
  setAddedOnDate() {
    this.added_on = new Date();
  }
}
