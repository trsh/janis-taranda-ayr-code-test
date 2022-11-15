import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  Column,
  Index,
} from 'typeorm';

import { Strain } from './strain.entity';
import { Benefit } from './benefit.entity';

@Entity()
@Index(['benefitId', 'strainId'], { unique: true })
export class StrainBenefit {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public benefitId!: number;

  @Column()
  public strainId!: number;

  @ManyToOne(() => Strain, (strain) => strain.strainBenefit)
  public strain!: Strain;

  @ManyToOne(() => Benefit, (benefit) => benefit.strainBenefit)
  public benefit!: Benefit;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;
}
