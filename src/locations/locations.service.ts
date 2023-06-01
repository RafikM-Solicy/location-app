import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from './locations.entity';

@Injectable()
export class LocationsService {
    constructor(
        @InjectRepository(Location)
        private locationsRepository: Repository<Location>,
    ) { }

    async findAll(): Promise<Location[]> {
        try {
            return this.locationsRepository.find({
                select: ['id', 'addressName', 'lat', 'long'],
            });
        } catch (error) {
            throw new Error('Failed to fetch locations from the database.');
        }
    }

    async findById(id: number): Promise<Location> {
        try {
            const location = await this.locationsRepository.findOne({
                select: ['id', 'addressName', 'lat', 'long'],
                where: { id },
            });
            if (!location) {
                throw new NotFoundException(`Location with id ${id} not found.`);
            }
            return location;
        } catch (error) {
            throw new Error(`Failed to fetch location with id ${id} from the database.`);
        }
    }

    async create(locationData: Location): Promise<Location> {
        try {
            return this.locationsRepository.save(locationData);
        } catch (error) {
            throw new Error('Failed to create location in the database.');
        }
    }

    async update(id: number, locationData: Location): Promise<Location> {
        try {
            const existingLocation = await this.locationsRepository.findOne({
                where: { id },
            });
            if (!existingLocation) {
                throw new NotFoundException(`Location with id ${id} not found.`);
            }
            await this.locationsRepository.update(id, locationData);
            return this.locationsRepository.findOne({
                select: ['id', 'addressName', 'lat', 'long'],
                where: { id },
            });
        } catch (error) {
            throw new Error(`Failed to update location with id ${id} in the database.`);
        }
    }

    async delete(id: number): Promise<void> {
        try {
            const deleteResult = await this.locationsRepository.delete(id);
            if (deleteResult.affected === 0) {
                throw new NotFoundException(`Location with id ${id} not found.`);
            }
        } catch (error) {
            throw new Error(`Failed to delete location with id ${id} from the database.`);
        }
    }
}
