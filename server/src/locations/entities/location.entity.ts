import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('locations')
export class LocationsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  pickUpLocation: string;

  @Column()
  dropOffLocation: string;

  @Column()
  isDelete: boolean;
}
