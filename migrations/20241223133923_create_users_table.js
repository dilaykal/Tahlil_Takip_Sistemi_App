// migrations/xxxx_create_users_table.js

exports.up = function(knex) {
    return knex.schema.createTable('users', function(table) {
      table.increments('id').primary();
      table.string('full_name').notNullable();
      table.string('tc_no', 11).unique().notNullable();
      table.string('email').unique().notNullable();
      table.enu('gender', ['female', 'male']).notNullable();
      table.date('birth_date').notNullable();
      table.string('phone').notNullable();
      table.string('password').notNullable(); // Şifreyi güvenli bir şekilde saklamak için bcrypt kullanabilirsiniz
      table.timestamps(true, true); // created_at ve updated_at
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users');
  };
  