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
  uid: string;
}
export interface IExpense_month {
  totalAmount: number;
  totalTimes: number;
  expenses: {
    time: Date;
    amount: number;
  }[];
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
