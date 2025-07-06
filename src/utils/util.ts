export const isValidEmail = (email?: string) => email ? /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
    email): false


export function testUpper(text:string) {
    return /[A-Z]/.test(text);
}


export function testLower(text:string) {
    return /[a-z]/.test(text);
}


export function testDigit(text:string) {
    return /\d/.test(text);
}


export function testSpecial(text:string) {
    return /[@*^!$%&?]/.test(text);
}


export function isStrongPassword(password?:string) {
    return password ? testUpper(password) && testLower(password) && testDigit(password) && testSpecial(password) && password.length >= 8 : false;
}

export const PAGE_LIMIT= 5

export const savingsOptions = [ {
    label: "Emergency Fund",
    value: "EMERGENCY_FUND",
  },
  {
    label: "Retirement Savings",
    value: "RETIREMENT_SAVINGS",
  },
  {
    label: "Mutual Fund",
    value: "MUTUAL_FUNDS",
  },
  {
    label: "Fixed Deposite",
    value: "FIXED_DEPOSITE",
  }]

export const categories = [
  {
    label: "Rent",
    value: "RENT",
  },
  {
    label: "Utilities",
    value: "UTILITIES",
  },
  {
    label: "Groceries",
    value: "GROCERIES",
  },
  {
    label: "Transportation",
    value: "TRANSPORTATION",
  },
  {
    label: "Insurance",
    value: "INSURANCE",
  },
  {
    label: "Dining Out",
    value: "DINING_OUT",
  },
  {
    label: "Entertainment",
    value: "ENTERTAINMENT",
  },
  {
    label: "Shopping",
    value: "SHOPPING",
  },
  {
    label: "Vacations",
    value: "VACATIONS",
  },
  {
    label: "Leisure",
    value: "LEISURE",
  },
  ...savingsOptions
];

export const categories_types = {
    RENT: 'NEED',
    UTILITIES: 'NEED',
    GROCERIES: 'NEED',
    TRANSPORTATION: 'NEED',
    INSURANCE: 'NEED',
    DINING_OUT: 'WANT',
    ENTERTAINMENT: 'WANT',
    SHOPPING: 'WANT',
    VACATION: 'WANT',
    LEISURE: 'WANT',
    EMERGENCY_FUND: 'SAVING',
    RETIREMENT_FUND: 'SAVING',
    EDUCATION_FUND: 'SAVING',
    MUTUAL_FUND: 'SAVING',
    FIXED_DEPOSIT: 'SAVING'
} as const