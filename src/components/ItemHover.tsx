import React from "react";
import { useItem } from "../hooks/useItem";
import ItemSeparator from "./ItemSeparator";

interface ItemHoverProps {
  itemData: string;
}

export function ItemHover({ itemData }: ItemHoverProps) {
  const {
    itemName,
    ItemStats,
    ItemRequirements,
    ItemEnchants,
    ItemImplicits,
    ItemExplicits,
  } = useItem(itemData);

  // Add back absolute
  return (
    <div className="item-hover z-50 top-0 left-full bg-black/80 rounded-md  shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)]">
      <div className="flex flex-col gap-2">
        {itemName.length > 0 ? (
          <div className="rare-header__double flex flex-col text-center items-center">
            {itemName.map((line) => (
              <span key={`item_${line}`}>{line}</span>
            ))}
          </div>
        ) : null}
        <div className="flex flex-col px-4 gap-0.5 mb-4">
          <ItemStats />
          <ItemSeparator />
          <ItemRequirements />
          <ItemSeparator />
          <ItemEnchants />
          <ItemImplicits />
          <ItemExplicits />
        </div>
      </div>
    </div>
  );
}
