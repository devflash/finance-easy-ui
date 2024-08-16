export interface IIncome{
    _id: string
    source: string,
    amount: number,
    userId: string,
    incomeDate: Date,
    depositType: string,
    description:  string,
    category:  string,
    createdAt: Date;
    updateAt: Date;
}

export type IncomeData = Record<
  keyof Omit<IIncome, "_id" | "userId" | "createdAt" | "updateAt">,
  string
>;
