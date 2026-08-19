// Dupatta Size Data
export const dupattaSizeData = [
  { type: "Standard Dupatta", length: "2.5 yards", width: "1 yard" },
  { type: "Large Dupatta", length: "2.75 yards", width: "1.25 yards" },
];

const STANDARD_SHIRT = {
  sizes: ["XS", "S", "M", "L", "XL"],
  shoulder: ["13", "13.5", "14", "15", "15.5"],
  sleeveLength: ["20", "22", "22", "23", "23"],
  chest: ["18", "20", "21", "22", "24"],
};

const STANDARD_TROUSER = {
  sizes: ["XS", "S", "M", "L", "XL"],
  length: ["36.5", "37", "37.5", "38.5", "39.5"],
  waist: ["13", "14", "15", "16", "17"],
  hip: ["19.5", "21", "22.5", "24", "25.5"],
  thigh: ["12", "12.5", "13.5", "14.5", "15"],
};

const PRODUCT_SPECIFICS: Record<string, { length: string[], sleeveOpening: string[], bottomOpening: string[] }> = {
  "obsidian black": {
    length: ["36", "36", "36", "36", "38"],
    sleeveOpening: ["8", "9", "9", "9", "10"],
    bottomOpening: ["8", "9", "9", "9", "10"],
  },
  "mint breeze": {
    length: ["36", "36", "36", "36", "38"],
    sleeveOpening: ["8", "9", "9", "9", "10"],
    bottomOpening: ["9", "9", "9", "9", "10"],
  },
  "midnight classic": {
    length: ["45", "46", "48", "49", "50"],
    sleeveOpening: ["4", "4", "4.5", "4.5", "5"],
    bottomOpening: ["6", "6", "6.5", "7", "8"],
  },
  "crimson aura": {
    length: ["45", "46", "48", "49", "50"],
    sleeveOpening: ["4", "4", "4.5", "4.5", "5"],
    bottomOpening: ["8", "9", "9", "9", "10"],
  },
  "vanilla meadows": {
    length: ["36", "36", "36", "36", "38"],
    sleeveOpening: ["7", "7", "7", "7", "8"],
    bottomOpening: ["8", "9", "9", "9", "10"],
  },
  "royal velvet": {
    length: ["45", "46", "48", "49", "50"],
    sleeveOpening: ["7", "7", "7", "7", "8"],
    bottomOpening: ["8", "9", "9", "9", "10"],
  },
  "blush heaven": {
    length: ["36", "36", "36", "36", "38"],
    sleeveOpening: ["4", "4", "4.5", "4.5", "5"],
    bottomOpening: ["7", "7", "8", "8", "9"],
  },
  "royal dust": {
    length: ["45", "46", "48", "49", "50"],
    sleeveOpening: ["8", "9", "9", "9", "10"],
    bottomOpening: ["6", "6", "6.5", "7", "8"],
  },
  "pastel lilac": {
    length: ["45", "46", "48", "49", "50"],
    sleeveOpening: ["8", "9", "9", "9", "10"],
    bottomOpening: ["8", "9", "9", "9", "10"],
  },
  "ocean mist": {
    length: ["36", "36", "36", "36", "38"],
    sleeveOpening: ["8", "9", "9", "9", "10"],
    bottomOpening: ["8", "9", "9", "9", "10"],
  },
};

function getSpecifics(productName: string) {
  const n = productName.toLowerCase().replace(/[^a-z]/g, "");
  if (n.includes("obsidian") || n.includes("obsedian")) return PRODUCT_SPECIFICS["obsidian black"];
  if (n.includes("mint")) return PRODUCT_SPECIFICS["mint breeze"];
  if (n.includes("midnight")) return PRODUCT_SPECIFICS["midnight classic"];
  if (n.includes("crimson") || n.includes("crimso")) return PRODUCT_SPECIFICS["crimson aura"];
  if (n.includes("vanilla")) return PRODUCT_SPECIFICS["vanilla meadows"];
  if (n.includes("royal") && n.includes("velvet")) return PRODUCT_SPECIFICS["royal velvet"];
  if (n.includes("royal") && n.includes("dust")) return PRODUCT_SPECIFICS["royal dust"];
  if (n.includes("angarkha") || (n.includes("rose") && n.includes("dust"))) return PRODUCT_SPECIFICS["royal dust"];
  if (n.includes("blush") || n.includes("heaven")) return PRODUCT_SPECIFICS["blush heaven"];
  if (n.includes("pastel")) return PRODUCT_SPECIFICS["pastel lilac"];
  if (n.includes("ocean") || n.includes("ocene")) return PRODUCT_SPECIFICS["ocean mist"];
  
  return PRODUCT_SPECIFICS["obsidian black"]; // Fallback
}

export function getSizeGuide(productName: string) {
  const specifics = getSpecifics(productName);

  const kameez = STANDARD_SHIRT.sizes.map((size, index) => ({
    size,
    length: specifics.length[index],
    shoulder: STANDARD_SHIRT.shoulder[index],
    chest: STANDARD_SHIRT.chest[index],
    sleeveLength: STANDARD_SHIRT.sleeveLength[index],
    sleeveOpening: specifics.sleeveOpening[index],
  }));

  const shalwar = STANDARD_TROUSER.sizes.map((size, index) => ({
    size,
    length: STANDARD_TROUSER.length[index],
    waist: STANDARD_TROUSER.waist[index],
    hip: STANDARD_TROUSER.hip[index],
    thigh: STANDARD_TROUSER.thigh[index],
    hem: specifics.bottomOpening[index],
  }));

  return { kameez, shalwar };
}

// Fallback exports in case they are used elsewhere
export const sizeData = getSizeGuide("obsidian black").kameez;
export const shalwarSizeData = getSizeGuide("obsidian black").shalwar;
