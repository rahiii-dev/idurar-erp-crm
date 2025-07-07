const { globSync } = require('glob');
const fs = require('fs');

const seedSettings = async () => {
  const Setting = require('@/models/coreModels/Setting');

  const settingFiles = [];
  const settingsFiles = globSync('../../../src/setup/defaultSettings/**/*.json');

  for (const filePath of settingsFiles) {
    const file = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    settingFiles.push(...file);
  }

  try {
    await Setting.createIndexes();
    console.log('👍 Settings indexes created successfully');
  } catch (error) {
    console.error('❌ Error creating indexes for Settings:', error);
    throw error;
  }
};

module.exports = seedSettings;
