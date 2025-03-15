export interface Item {
  id: string;
  name: string;
  category: string;
  minLevel: number;
  quantity: number;
  price: number;
  totalValue: number;
}

export type ItemsByFolder = {
  [folderName: string]: Item[];
};
