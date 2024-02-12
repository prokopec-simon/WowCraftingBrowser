const fs = require("fs");
const Database = require("wow-classic-items");

const items = new Database.Items().filter(
  (item) =>
    item.createdBy != undefined &&
    item.createdBy[0].category == "Alchemy" &&
    item.createdBy[0].requiredSkill <= 300
);

const distinctReagentIds = [];

items.forEach((item) =>
  item.createdBy[0].reagents.forEach((reagent) => {
    if (distinctReagentIds.indexOf(reagent.itemId) == -1) {
      distinctReagentIds.push(reagent.itemId);
    }
  })
);

const allItems = new Database.Items();
const reagentIdsWithNames = [];
distinctReagentIds.forEach((reagentId) => {
  const reagentName = allItems.filter((item) => item.itemId === reagentId)[0]
    .name;
  reagentIdsWithNames.push({ reagentId, reagentName });
});
const jsonData = JSON.stringify({ reagents: reagentIdsWithNames }, null, 2);
const filePath = "alchemy_reagent_ids.json";
fs.writeFileSync(filePath, jsonData);
