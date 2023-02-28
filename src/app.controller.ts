import { Controller, Get, Post, Patch, Delete, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { data, ReportType } from './data';

@Controller('report/:type')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getAllReports(@Param('type') type: string) {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;

    return data.report.filter((report) => report.type === reportType);
  }

  @Get()
  getReportById() {
    return {};
  }

  @Post()
  createReport() {
    return 'Create';
  }

  @Patch()
  updateReport() {
    return 'Update';
  }

  @Delete()
  deleteReport() {
    return 'Delete';
  }
}
