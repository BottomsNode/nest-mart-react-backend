import { Controller, Get, UseGuards } from '@nestjs/common';
import { CustomerActivityLogService } from './customer-activity-log.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('logs')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class CustomerActivityLogController {
    constructor(private readonly logService: CustomerActivityLogService) { }

    @Get()
    async findAll() {
        return this.logService.getAllLogs();
    }
}
