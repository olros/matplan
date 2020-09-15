export interface IDay {
  day: number;
  plan: string;
  recipe?: firebase.firestore.DocumentReference;
}

export interface IPlan {
  uid: string;
  public: boolean;
  slug?: string;
  days: Array<IDay>;
}

export interface IExpense {
  time: firebase.firestore.Timestamp;
  amount: number;
}

export interface IExpense_month {
  month: number;
  totalAmount: number;
  totalTimes: number;
  expenses: Array<IExpense>;
}

export interface IRecipes {
  owner: string;
  public: boolean;
  title: string;
  img?: string;
  ingredients: {
    name: string;
    amount: number;
  }[];
  steps: string[];
}
