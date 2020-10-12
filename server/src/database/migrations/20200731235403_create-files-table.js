exports.up = function (knex) {
  return knex.schema.createTable('distance', function (table) {
    table.increments('id').primary();
    table.string('fullname', 100);
    table.string('chooseDistances', 50);
    table.string('fileName', 255);
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('distance');
};
