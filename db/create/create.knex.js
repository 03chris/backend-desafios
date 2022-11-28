const knexConfig = require('../config');
const knex = require('knex')(knexConfig);

knex.schema.createTable('products', table => {
    table.increments('id'),
    table.string('code').notNullable(),
    table.string('name').notNullable(),  
    table.string('photo').notNullable(),
    table.float('price')
}).then(() => {
    console.info('Table created');
}).catch(err => {
    console.error(err)
}).finally(() => {
    knex.destroy();
});