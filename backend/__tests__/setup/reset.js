async function reset() {
  const Setting = require('@/models/coreModels/Setting');
  const Taxes = require('@/models/appModels/Taxes');
  

  try {
    await Setting.deleteMany();
    await Taxes.deleteMany();
  } catch (error) {
    console.error('❌ Error deleting Setting:', error);
  }
}

module.export = reset;
