import { Controller, Get } from '@nestjs/common';
import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {
    
    constructor(private reportService: ReportsService){}

    @Get('summary')
    async getSummary() {
        return this.reportService.getSummary();
    }
}
