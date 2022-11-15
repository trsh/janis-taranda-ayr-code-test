import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  OneToMany,
} from 'typeorm';

import { TerpeneBenefit } from './terpene.benefit.entity';
import { StrainBenefit } from './strain.benefit.entity';

@Entity()
export class Benefit {
  @PrimaryGeneratedColumn()
  public id: number;

  @Index()
  @Column()
  public name: string;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  @OneToMany(() => TerpeneBenefit, (terpeneBenefit) => terpeneBenefit.benefit, {
    onDelete: 'CASCADE',
  })
  public terpeneBenefit!: TerpeneBenefit[];

  @OneToMany(() => StrainBenefit, (strainBenefit) => strainBenefit.benefit, {
    onDelete: 'CASCADE',
  })
  public strainBenefit!: StrainBenefit[];
}
