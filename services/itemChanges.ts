import { Item } from "@/types/types";

//Returns an object with only fields that have changed (excluding the id)
export function getChangedFields(
  oldItem: Item,
  newItem: Item
): Partial<Omit<Item, 'id'>> {

  //Store changes in a partial item object (excluding id)
  const changes: Partial<Omit<Item, 'id'>> = {};

  //Get the keys of the new item object
  const keys = Object.keys(newItem) as (keyof Item)[];

  //For each key of the item object
  for (const key of keys) {
    //omit id for the purposes of changes
    if (key === 'id') continue;

    const oldValue = oldItem[key];
    const newValue = newItem[key];

    //when values don't match, store in changes
    if (oldValue !== newValue) {
      changes[key as keyof Omit<Item, 'id'>] = newValue as any;
    }
  }

  return changes;
}