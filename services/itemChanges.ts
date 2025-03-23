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

export const generateChangeDescription = (
  oldItem: Item,
  newItem: Item
): string => {
  const changes: string[] = [];

  // Handle name change as a special case
  if (oldItem.name !== newItem.name) {
    changes.push(`Changed name of item ${oldItem.name} to ${newItem.name}.`);
  }

  // Use the new name (or fallback to old if missing)
  const labelName = newItem.name || oldItem.name;

    //Get the keys of the new item object
    const keys = Object.keys(newItem) as (keyof Item)[];

    //For each key of the item object
    for (const key of keys) {
      //omit id for the purposes of changes
      if (key === 'id' || key === "name") continue;
  
      const oldValue = oldItem[key];
      const newValue = newItem[key];

    if (oldValue !== newValue) {
      changes.push(
        `${labelName}: Changed ${key} from ${oldValue} to ${newValue}.`
      );
    }
  }

  return changes.join(" ");
};
