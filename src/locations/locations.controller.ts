import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { Location } from './locations.entity';
import { LocationsService } from './locations.service';

@Controller('location')
export class LocationsController {
    constructor(private readonly locationsService: LocationsService) { }

    @Get()
    async findAll(): Promise<Location[]> {
        try {
            return this.locationsService.findAll();
        } catch (error) {
            throw new Error('Failed to fetch locations.');
        }
    }

    @Get(':id')
    async findById(@Param('id') id: number): Promise<Location> {
        try {
            return this.locationsService.findById(id);
        } catch (error) {
            throw new Error(`Failed to fetch location with id ${id}.`);
        }
    }

    @Post()
    async create(@Body() locationData: Location): Promise<Location> {
        try {
            return this.locationsService.create(locationData);
        } catch (error) {

            throw new Error('Failed to create location.');
        }
    }

    @Put(':id')
    async createOrReplace(@Param('id') id: number, @Body() locationData: Location): Promise<Location> {
        try {
            return this.locationsService.update(id, locationData);
        } catch (error) {
            throw new Error(`Failed to create or replace location with id ${id}.`);
        }
    }

    @Delete(':id')
    async delete(@Param('id') id: number): Promise<void> {
        try {
            await this.locationsService.delete(id);
        } catch (error) {
            throw new Error(`Failed to delete location with id ${id}.`);
        }
    }
}
