import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { AppService } from './app.service';
import { data, ReportType } from './data';

@Controller('report/:type')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getAllReports(@Param('type') type: string) {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;

    return this.appService.getAllReports(reportType);
  }

  @Get(':id')
  getReportById(@Param('type') type: string, @Param('id') id: string) {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;

    return this.appService.getReportById(reportType, id);
  }

  @Post()
  createReport(
    @Body()
    { source, amount }: { source: string; amount: number },
    @Param('type') type: string,
  ) {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;

    return this.appService.createReport({ source, amount }, reportType);
  }

  @Patch()
  updateReport(
    @Body()
    { id, source, amount }: { id: string; source: string; amount: number },
    @Param('type') type: string,
  ) {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;

    const report = data.report.find(
      (report) => report.type === reportType && report.id === id,
    );

    if (!report) {
      return 'Report not found';
    }

    report.source = source;
    report.amount = amount;
    report.updated_at = new Date();

    return report;
  }

  @Delete(':id')
  deleteReport(@Param('id') id: string) {
    const reportIndex = data.report.findIndex((report) => report.id === id);

    if (reportIndex === -1) {
      return 'Report not found';
    }

    const deletedReport = data.report.splice(reportIndex, 1);

    return {
      message: 'Report deleted',
      deletedReport,
    };
  }
}
