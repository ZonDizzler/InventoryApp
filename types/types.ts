import { Timestamp } from "firebase/firestore";

export interface Item {
  id: string;
  name: string;
  category: string;
  minLevel: number;
  quantity: number;
  price: number;
  totalValue: number;
}

export interface ItemHistoryEntry {
  timestamp: Timestamp;
  changes: Partial<Omit<Item, 'id'>>; // only changed fields
  description: string;
}

export type ItemsByFolder = {
  [folderName: string]: Item[];
};
