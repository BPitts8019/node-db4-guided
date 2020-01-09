const ZOOS = "zoos";
const ANIMALS = "animals";
const SPECIES = "species";
const ZOOS_ANIMALS = "zoos_animals";

exports.up = async function (knex) {
   await knex.schema.createTable(ZOOS, (table) => {
      table.increments("id");
      table.string("name").notNullable();
      table.string("address").notNullable();
   });

   await knex.schema.createTable(SPECIES, (table) => {
      table.increments("id");
      table.string("name").notNullable();
   });

   await knex.schema.createTable(ANIMALS, (table) => {
      table.increments("id");
      table.string("name").notNullable();
      table.integer("species_id")
         .notNullable()
         .references("id").inTable(SPECIES)
         .onDelete("CASCADE")
         .onUpdate("CASCADE");
   });

   await knex.schema.createTable(ZOOS_ANIMALS, (table) => {
      const ZOOS_ID = "zoo_id";
      const ANIMALS_ID = "animal_id";

      table.integer(ZOOS_ID)
         .notNullable()
         .references("id").inTable(ZOOS)
         .onDelete("CASCADE")
         .onUpdate("CASCADE");
      table.integer(ANIMALS_ID)
         .notNullable()
         .references("id").inTable(ANIMALS)
         .onDelete("CASCADE")
         .onUpdate("CASCADE");
      table.date("from");
      table.date("to");
      table.primary([ZOOS_ID, ANIMALS_ID])
   });
};

exports.down = async function (knex) {
   await knex.schema.dropTableIfExists(ZOOS_ANIMALS);
   await knex.schema.dropTableIfExists(ANIMALS);
   await knex.schema.dropTableIfExists(SPECIES);
   await knex.schema.dropTableIfExists(ZOOS);
};
