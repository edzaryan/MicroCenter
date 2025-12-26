const fs = require('fs');

const filePath = './fridges.json'; 

const products = JSON.parse(fs.readFileSync(filePath, 'utf8'));

const removeDuplicates = (arr) => {
  const seen = new Set();
  const unique = [];
  const duplicates = [];

  for (const item of arr) {
    const cleanName = item.productName.trim().toLowerCase();

    if (seen.has(cleanName)) {
      duplicates.push(item.productName);
    } else {
      seen.add(cleanName);
      unique.push(item);
    }
  }

  return { unique, duplicates };
};

const { unique, duplicates } = removeDuplicates(products);

if (duplicates.length > 0) {
  console.log(`❌ Found ${duplicates.length} duplicates:`, duplicates);
  
  fs.writeFileSync(filePath, JSON.stringify(unique, null, 2), 'utf8');
  
  console.log(`✅ SUCCESS: ${filePath} has been updated. Original count: ${products.length}, New count: ${unique.length}`);
} else {
  console.log('✅ No duplicates found. File remains unchanged.');
}