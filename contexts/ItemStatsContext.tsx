import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
} from "react";
import {
  subscribeToCategories,
  subscribeToItems,
} from "@/services/itemService";
import { subscribeToItemLocations } from "@/services/itemLocationService";
import {
  ItemsByFolder,
  CategoryStats,
  Item,
  ItemLocation,
} from "@/types/types";
import { useOrganization, useUser } from "@clerk/clerk-expo";

type ItemStats = {
  itemsByFolder: ItemsByFolder;
  categories: string[];
  categoryStats: CategoryStats;
  lowStockItemsByFolder: ItemsByFolder;
  totalCategories: number;
  totalItems: number;
  totalQuantity: number;
  totalValue: number;
  recentlyEditedItems: Item[];
  itemLocations: ItemLocation[];
  locationNames: string[];
};

const ItemStatsContext = createContext<ItemStats | undefined>(undefined);

export const ItemStatsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [itemsByFolder, setItemsByFolder] = useState<ItemsByFolder>({});
  const [categories, setCategories] = useState<string[]>([]);
  const [itemLocations, setItemLocations] = useState<ItemLocation[]>([]);

  const { organization } = useOrganization();
  const { user } = useUser();

  // Subscribe to Firestore updates
  useEffect(() => {
    if (!user || !organization?.id) return;

    const unsubscribeItems = subscribeToItems(
      organization.id,
      setItemsByFolder
    );
    const unsubscribeCategories = subscribeToCategories(
      organization.id,
      setCategories
    );
    const unsubscribeItemLocations = subscribeToItemLocations(
      organization.id,
      setItemLocations
    );

    return () => {
      unsubscribeItems();
      unsubscribeCategories();
      unsubscribeItemLocations();
    };
  }, [user, organization?.id]);

  // Derived values with memoization
  const locationNames = useMemo(
    () => itemLocations.map((location) => location.name),
    [itemLocations]
  );

  const recentlyEditedItems = useMemo(() => {
    return Object.values(itemsByFolder)
      .flat()
      .filter((item) => item.editedAt)
      .sort((a, b) => b.editedAt!.toMillis() - a.editedAt!.toMillis());
  }, [itemsByFolder]);

  const totalCategories = useMemo(() => categories.length, [categories]);

  const totalItems = useMemo(() => {
    return Object.values(itemsByFolder).reduce(
      (sum, items) => sum + items.length,
      0
    );
  }, [itemsByFolder]);

  const totalQuantity = useMemo(() => {
    return Object.values(itemsByFolder).reduce(
      (sum, items) =>
        sum +
        items.reduce(
          (itemSum, item) => itemSum + (Number(item.quantity) || 0),
          0
        ),
      0
    );
  }, [itemsByFolder]);

  const totalValue = useMemo(() => {
    return Object.values(itemsByFolder).reduce(
      (sum, items) =>
        sum +
        items.reduce(
          (itemSum, item) =>
            itemSum + (Number(item.quantity) || 0) * (Number(item.price) || 0),
          0
        ),
      0
    );
  }, [itemsByFolder]);

  const categoryStats = useMemo(() => {
    return Object.entries(itemsByFolder).reduce((acc, [folder, items]) => {
      const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
      const totalValue = items.reduce(
        (sum, item) => sum + item.quantity * item.price,
        0
      );
      acc[folder] = { totalQuantity, totalValue };
      return acc;
    }, {} as CategoryStats);
  }, [itemsByFolder]);

  const lowStockItemsByFolder = useMemo(() => {
    return Object.entries(itemsByFolder).reduce((acc, [folder, items]) => {
      const lowStock = items.filter((item) => item.quantity < item.minLevel);
      if (lowStock.length > 0) acc[folder] = lowStock;
      return acc;
    }, {} as ItemsByFolder);
  }, [itemsByFolder]);

  //Bundle the stats into an object
  const value: ItemStats = {
    itemsByFolder,
    categories,
    categoryStats,
    lowStockItemsByFolder,
    totalCategories,
    totalItems,
    totalQuantity,
    totalValue,
    recentlyEditedItems,
    itemLocations,
    locationNames,
  };

  //Make value available to nested components
  return (
    <ItemStatsContext.Provider value={value}>
      {children}
    </ItemStatsContext.Provider>
  );
};

export const useItemStats = () => {
  const context = useContext(ItemStatsContext);
  if (!context) {
    throw new Error("useItemStats must be used within an ItemStatsProvider");
  }
  return context;
};
