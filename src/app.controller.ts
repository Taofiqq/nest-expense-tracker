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
import { v4 as uuid } from 'uuid';

@Controller('report/:type')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getAllReports(@Param('type') type: string) {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;

    return data.report.filter((report) => report.type === reportType);
  }

  @Get(':id')
  getReportById(@Param('type') type: string, @Param('id') id: string) {
    console.log('type', type);
    console.log('id', id);
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;

    const report = data.report.find(
      (report) => report.type === reportType && report.id === id,
    );

    if (!report) {
      return 'Report not found';
    }

    return report;
  }

  @Post()
  createReport(
    @Body()
    { source, amount }: { source: string; amount: number },
    @Param('type') type: string,
  ) {
    const newReport = {
      id: uuid(),
      source,
      amount,
      type: type === 'income' ? ReportType.INCOME : ReportType.EXPENSE,
      created_at: new Date(),
      updated_at: new Date(),
    };

    data.report.push(newReport);

    return newReport;
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
