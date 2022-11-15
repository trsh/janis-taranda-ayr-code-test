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
import { StrainTerpene } from './strain.terpene.entity';

@Entity()
export class Terpene {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column()
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => TerpeneBenefit, (terpeneBenefit) => terpeneBenefit.terpene, {
    onDelete: 'CASCADE',
  })
  public terpeneBenefit!: TerpeneBenefit[];

  @OneToMany(() => StrainTerpene, (strainTerpene) => strainTerpene.terpene, {
    onDelete: 'CASCADE',
  })
  public strainTerpene!: StrainTerpene[];
}
