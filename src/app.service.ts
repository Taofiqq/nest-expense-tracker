import { Injectable } from '@nestjs/common';
import { data, ReportType } from './data';
import { v4 as uuid } from 'uuid';

interface ReportData {
  amount: number;
  source: string;
}
@Injectable()
export class AppService {
  getAllReports(type: ReportType) {
    return data.report.filter((report) => report.type === type);
  }

  getReportById(type: ReportType, id: string) {
    return data.report.find(
      (report) => report.type === type && report.id === id,
    );
  }

  createReport({ source, amount }: ReportData, type: ReportType) {
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
}
