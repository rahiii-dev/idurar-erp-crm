const createCRUDController = require('@/controllers/middlewaresControllers/createCRUDController');
const methods = createCRUDController('Query');


const create = require('./create');
const update = require('./update');
const addNote = require('./addNote');
const updateNote = require('./updateNote');
const deleteNote = require('./deleteNote');

methods.create = create;
methods.update = update;
methods.addNote = addNote;
methods.updateNote = updateNote;
methods.deleteNote = deleteNote;

module.exports = methods;