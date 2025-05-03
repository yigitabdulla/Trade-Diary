// types.ts
export type Range = {
    min?: number | '';
    max?: number | '';
  };
  
  export type SearchState = {
    [key: string]: string | Range;
  };
  
  export type DataType = {
    id: number;
    name: string;
    category: string;
    brand: string;
    price: number;
    stock: number;
    status: string;
    lastRestock: string;
    [key: string]: any;
  };
  