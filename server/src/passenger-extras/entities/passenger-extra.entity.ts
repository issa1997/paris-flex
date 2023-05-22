import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('passengerExtras')
export class PassengerExtrasEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  passengerId: number;

  @Column({ type: 'longtext' })
  extrasDescription: string;

  @Column()
  childSeats: number;

  @Column()
  boosterSeats: number;

  @Column()
  isDelete: boolean;
}
