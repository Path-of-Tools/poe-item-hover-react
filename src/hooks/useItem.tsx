import React from "react";

import { Parser, ItemText } from "@klayver/poe-itemtext-parser";
import ItemSeparator from "../components/ItemSeparator";

function parseCrucibleItem(text: ItemText) {
  const crucibleSection: string[] = [];

  const hasCrucibleTree = text.sections.filter((sec) => {
    return sec.lines.some((line) => line.includes("crucible"));
  });

  if (hasCrucibleTree.length === 0) {
    return [];
  }

  for (const sec of hasCrucibleTree) {
    for (const line of sec.lines) {
      crucibleSection.push(line.replace("(crucible)", "").trim());
    }
  }

  return crucibleSection;
}

export function useItem(item: string) {
  const parsedItem = new Parser(item);

  const itemName = parsedItem.itemtext.sections[0].lines.slice(2);
  const quality = parsedItem.quality;
  const offense = parsedItem.offense;
  const defence = parsedItem.defense;
  const requirements = parsedItem.requirements;
  const enchants = parsedItem.affixes?.filter((aff) => aff.type === "enchant");
  const explicits = parsedItem.affixes?.filter(
    (aff) => aff.type !== "implicit" && aff.type !== "enchant"
  );
  const implicits = parsedItem.affixes?.filter(
    (aff) => aff.type === "implicit"
  );

  const crucible = parseCrucibleItem(parsedItem.itemtext);

  const ItemRequirements = () => {
    if (!requirements) {
      return null;
    }

    const level = (
      <span>
        Level <span className="text-white">{requirements?.level}</span>
      </span>
    );
    const str =
      requirements?.strength && requirements.strength > 0 ? (
        <span>
          , Str <span className="text-white">{requirements?.strength}</span>
        </span>
      ) : (
        ""
      );

    const dex =
      requirements?.dexterity && requirements.dexterity > 0 ? (
        <span>
          , Dex <span className="text-white">{requirements?.dexterity}</span>
        </span>
      ) : (
        ""
      );

    const int =
      requirements?.intelligence && requirements.intelligence > 0 ? (
        <span>
          , Int <span className="text-white">{requirements?.intelligence}</span>
        </span>
      ) : (
        ""
      );

    return (
      <div className="flex justify-center">
        <span className="text-poe-default text-s">
          Requires {level} {str} {dex} {int}
        </span>
      </div>
    );
  };

  const DefensiveStats = () => {
    if (!defence) {
      return null;
    }

    return (
      <>
        {defence?.armour > 0 && (
          <span className="text-s text-poe-default">
            Armour: <span className="text-white">{defence.armour}</span>
          </span>
        )}
        {defence?.energyShield > 0 && (
          <span className="text-s text-poe-default">
            Energy Shield:{" "}
            <span className="text-white">{defence.energyShield}</span>
          </span>
        )}
        {defence?.evasion > 0 && (
          <span className="text-s text-poe-default">
            Evasion Rating:{" "}
            <span className="text-white">{defence.evasion}</span>
          </span>
        )}
      </>
    );
  };

  const OffensiveStats = () => {
    if (!offense) {
      return null;
    }

    return (
      <>
        {offense.damage.physical && (
          <span className="text-s text-poe-default">
            Physical Damage:{" "}
            <span className="text-white">
              {offense.damage.physical.min}-{offense.damage.physical.max}
            </span>
          </span>
        )}
        {offense.critChance && (
          <span className="text-s text-poe-default">
            Critical Strike Chance:{" "}
            <span className="text-white">{offense.critChance}%</span>
          </span>
        )}
        {offense.aps && (
          <span className="text-s text-poe-default">
            Attacks Per Second:{" "}
            <span className="text-white">{offense.aps}</span>
          </span>
        )}
      </>
    );
  };

  const ItemStats = () => {
    return (
      <div className="flex flex-col text-center">
        {quality?.value && quality.value > 0 && (
          <span className="text-s text-poe-default">
            Quality:{" "}
            <span className="custom-text-augment">+{quality?.value}%</span>
          </span>
        )}
        <OffensiveStats />
        <DefensiveStats />
      </div>
    );
  };

  const ItemEnchants = () => {
    if (!enchants || enchants.length === 0) {
      return null;
    }

    return (
      <>
        <div className="flex flex-col text-center">
          {enchants.map((aff) => {
            return (
              <span className="text-s custom-text-enchant" key={aff.text}>
                {aff.text}
              </span>
            );
          })}
        </div>
        <ItemSeparator />
      </>
    );
  };

  const ItemImplicits = () => {
    if (!implicits || implicits.length === 0) {
      return null;
    }

    return (
      <>
        <div className="flex flex-col text-center">
          {implicits.map((aff) => {
            return (
              <span className="custom-text-augment text-s" key={aff.text}>
                {aff.text}
              </span>
            );
          })}
        </div>
        <ItemSeparator />
      </>
    );
  };

  const ItemExplicits = () => {
    if (!explicits || explicits.length === 0) {
      return null;
    }

    return (
      <div className="flex flex-col text-center">
        {explicits.map((aff) => {
          const textType = () => {
            if (aff.type === "fractured") {
              return "custom-text-fracture";
            }

            if (aff.type === "crafted") {
              return "custom-text-enchant";
            }

            return "custom-text-augment";
          };

          return (
            <span className={`${textType()} text-s`} key={aff.text}>
              {aff.text}
            </span>
          );
        })}
      </div>
    );
  };

  const ItemCrucible = () => {
    if (!crucible || crucible.length === 0) {
      return null;
    }

    return (
      <>
        <ItemSeparator />
        <div className="flex flex-col text-center">
          {crucible.map((aff) => {
            return (
              <span className={`text-orange-500 text-xs`} key={aff}>
                {aff}
              </span>
            );
          })}
        </div>
      </>
    );
  };

  return {
    itemName,
    quality,
    ItemRequirements,
    ItemStats,
    OffensiveStats,
    DefensiveStats,
    ItemEnchants,
    ItemImplicits,
    ItemExplicits,
    ItemCrucible,
  };
}
