import { Controller, Get } from '@nestjs/common';
import { CustomerActivityLogService } from './customer-activity-log.service';

@Controller('logs')
export class CustomerActivityLogController {
    constructor(private readonly logService: CustomerActivityLogService) { }

    @Get()
    async findAll() {
        return this.logService.getAllLogs();
    }
}
