export enum ReportType {
  INCOME = 'income',
  EXPENSE = 'expense',
}

export const data: Data = {
  report: [
    {
      id: '1',
      source: 'Logrocket',
      amount: 3000,
      type: ReportType.INCOME,
      created_at: new Date(),
      updated_at: new Date(),
    },

    {
      id: '2',
      source: 'Digital Ocean',
      amount: 1000,
      type: ReportType.EXPENSE,
      created_at: new Date(),
      updated_at: new Date(),
    },
  ],
};

interface Data {
  report: {
    id: string;
    source: string;
    amount: number;
    type: ReportType;
    created_at: Date;
    updated_at: Date;
  }[];
}
