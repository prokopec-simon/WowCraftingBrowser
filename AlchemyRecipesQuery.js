const fs = require("fs");
const Database = require("wow-classic-items");

const items = new Database.Items().filter(
  (item) =>
    item.createdBy != undefined &&
    item.createdBy[0].category == "Alchemy" &&
    item.createdBy[0].requiredSkill <= 300
);

const filteredAlchemyRecipes = items.map((item) => {
  const itemId = item.itemId;
  const sources = item.createdBy[0].reagents;

  return { name: item.name, itemId: itemId, reagents: sources };
});

const jsonData = JSON.stringify(filteredAlchemyRecipes, null, 2);
const filePath = "alchemy_filtered_recipes.json";
fs.writeFileSync(filePath, jsonData);
