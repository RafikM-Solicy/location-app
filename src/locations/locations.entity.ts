import { AbstractEntity } from 'src/abstract/abstract.entity';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Location extends AbstractEntity {
    @Column()
    addressName: string;

    @Column('decimal', { precision: 10, scale: 7 })
    lat: number;

    @Column('decimal', { precision: 10, scale: 7 })
    long: number;
}