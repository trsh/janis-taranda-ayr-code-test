import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  Column,
  Index,
} from 'typeorm';

import { Terpene } from './terpene.entity';
import { Strain } from './strain.entity';

@Entity()
@Index(['terpeneId', 'strainId'], { unique: true })
export class StrainTerpene {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public terpeneId!: number;

  @Column()
  public strainId!: number;

  @ManyToOne(() => Terpene, (terpene) => terpene.strainTerpene)
  public terpene!: Terpene;

  @ManyToOne(() => Strain, (strain) => strain.strainTerpene)
  public strain!: Strain;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;
}
