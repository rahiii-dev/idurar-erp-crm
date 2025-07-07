async function setup(){
    const seedSettings = require('./factories/seedSettings');
    const seedTax = require('./factories/seedTax');
    
    try {
        await seedSettings();
        await seedTax();
    } catch (error) {
        throw error;
    }
}

module.exports = setup;