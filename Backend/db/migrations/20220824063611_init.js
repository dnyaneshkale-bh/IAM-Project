/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema

    .createTable("rca_table", (table) => {
      table.uuid("rca_id").primary();
      table.text("rca_name").notNullable();
      table.text("facility_name").notNullable();
      table.text("severity").notNullable();
      table.date("creation_date").notNullable();
      table.date("target_date").notNullable();
      table.text("problem_description").notNullable();
      table.text("safety_impact").notNullable();
      table.text("enviornment_impact").notNullable();
      table.text("revenue_impact").notNullable();
      table.text("reputation_impact").notNullable();
      table.text("asset_impact").notNullable();
      table.integer("case_id").notNullable();
      table.text("source").notNullable();
      table.text("owner").notNullable();
      table.text("status").notNullable();
    })

    .createTable("documents", (table) => {
      table.increments("document_id");
      table.text("document_name");
      table.text("document_modified_name");
      table
        .uuid("rca_id")
        .references("rca_id")
        .inTable("rca_table")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    })

    .createTable("Assets", (table) => {
      table.increments("assetId");
      table.string("plant").notNullable();
      table.string("processArea").notNullable();
      table.string("asset").notNullable().primary().unique();
      table
        .uuid("rcaId")
        .references("rca_id")
        .inTable("rca_table")
        .notNullable()
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      // table.timestamps(true,true);
    })

    .createTable("team", (table) => {
      table
        .uuid("rca_id")
        .references("rca_id")
        .inTable("rca_table")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.increments("member_id");
      table.text("member_name");
      table.text("member_email").unique().notNullable();
      table.text("member_role");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTable("documents")

    .dropTable("team")
    .dropTable("Assets")
    .dropTable("rca_table");
};
