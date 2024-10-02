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

export type IBudget = {
  _id: string
  budgetDetails: {
    budgetName: string
    startDate: Date,
    endDate: Date,
  }
  budgetAllocation: {
    isExpectedAmount: boolean
    availableBudgetAmount: number,
    expectedAmount: number
    percentages: {
      needs: number,
      wants: number,
      savings: number
    }
  },
  status: string;
  createdAt: Date;
  updateAt: Date;
}

type ConvertToString<T> = {
  [K in keyof T]: T[K] extends Date ? string : T[K] extends object ? ConvertToString<T[K]> : T[K]
}

export type BudgetData = ConvertToString<Omit<IBudget, '_id' | 'createdAt' | 'updateAt' | 'status'>> 

export type UserSignup = {
  firstName: string,
  lastName: string,
  email: string,
  password: string
}