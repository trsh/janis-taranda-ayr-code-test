import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  OneToMany,
} from 'typeorm';

import { StrainTerpene } from './strain.terpene.entity';
import { StrainBenefit } from './strain.benefit.entity';

@Entity()
export class Strain {
  @PrimaryGeneratedColumn()
  public id: number;

  @Index()
  @Column()
  public name: string;

  // Note ideally we would combine those, because more properties are suspected
  @Column()
  public thc: number;

  @Column()
  public cbd: number;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  @OneToMany(() => StrainTerpene, (strainTerpene) => strainTerpene.strain, {
    onDelete: 'CASCADE',
  })
  public strainTerpene!: StrainTerpene[];

  @OneToMany(() => StrainBenefit, (strainBenefit) => strainBenefit.strain, {
    onDelete: 'CASCADE',
  })
  public strainBenefit!: StrainBenefit[];
}
