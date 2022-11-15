import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  Index,
  Column,
} from 'typeorm';

import { Terpene } from './terpene.entity';
import { Benefit } from './benefit.entity';

@Entity()
@Index(['terpeneId', 'benefitId'], { unique: true })
export class TerpeneBenefit {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public terpeneId!: number;

  @Column()
  public benefitId!: number;

  @Column()
  public cases!: number;

  @ManyToOne(() => Terpene, (terpene) => terpene.terpeneBenefit)
  public terpene!: Terpene;

  @ManyToOne(() => Benefit, (benefit) => benefit.terpeneBenefit)
  public benefit!: Benefit;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;
}
