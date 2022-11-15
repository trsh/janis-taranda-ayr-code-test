import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class SentencesSet {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public text: string;

  @Column()
  public hash: string;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;
}
