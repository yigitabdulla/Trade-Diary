// types.ts
export interface Range {
  min?: number | '';
  max?: number | '';
}

export interface SearchState {
  [key: string]: string | Range;
}

export interface DataType {
  id: number;
  name: string;
  category: string;
  brand: string;
  price: number;
  stock: number;
  status: string;
  lastRestock: string;
  [key: string]: any;
}

export interface User {
  id: number;
  username: string;
  email: string;
  role: 'user' | 'admin';
}

export interface Trade {
  id: number;
  user_id: number;
  parity: string;
  entry_price: number;
  stop_loss: number;
  take_profit: number;
  result_type: 'stop' | 'success';
  trade_date: Date;
  value: number;
  profit_loss: number;
  created_at: Date;
  updated_at: Date;
}