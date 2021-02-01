exports.up = (knex) => {
  return knex.schema.createTable('distance', (table) => {
    table.increments('id').primary();
    table.string('fullname', 100);
    table.string('chooseDistances', 50);
    table.string('docFile', 255);
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('distance');
};
