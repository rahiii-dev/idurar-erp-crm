const seedTax = async () => {
  const Taxes = require('@/models/appModels/Taxes');

  try {
    await Taxes.insertMany([{ taxName: 'Tax 0%', taxValue: '0', isDefault: true }]);
  } catch (error) {
    throw error;
  }
};

module.exports = seedTax;
