export interface IIncome{
    _id: string
    source: string,
    amount: number,
    userId: string,
    date: Date,
    depositType: string,
    description:  string,
    category:  string,
    createdAt: Date;
    updateAt: Date;
    type: 'Income'
}

export type IExpense = {
  _id: string
  category: string,
  moneyPaidTo: string,
  paymentMethod: string,
  amount: number,
  date: Date,
  description: string,
  userId: string,
  createdAt: Date;
  updateAt: Date;
  type: 'Expense'
}

export type IncomeData = Record<
  keyof Omit<IIncome, "_id" | "userId" | "createdAt" | "updateAt" | "type">,
  string
>;

export type ExpenseData = Record<
  keyof Omit<IExpense, "_id" | "userId" | "createdAt" | "updateAt" | "type">,
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

export type SearchIncomes = {
  incomes: IIncome[],
  count: number
}

export type SearchExpenses = {
  expenses: IExpense[],
  count: number
}

export interface ISaving{
    _id: string
    investmentType: string,
    amount: number,
    userId: string,
    date: Date,
    description:  string,
    createdAt: Date;
    updateAt: Date;
    type: "Saving"
}

export type SavingData = Record<
  keyof Omit<ISaving, "_id" | "userId" | "createdAt" | "updateAt" | "type">,
  string
>;

export type SearchSavings = {
  savings: ISaving[],
  count: number
}

export type ICard = {
  cardNumber: string;
  expirationDate: string;
  name: string;
  type: string;
};