/*
 * Copyright 2024 The Backstage Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// @ts-check

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function up(knex) {
  await knex.schema.alterTable('backstage_backend_tasks__tasks', table => {
    table
      .text('last_run_error_json', 'longtext')
      .nullable()
      .comment(
        'JSON serialized error object from the last task run, if it failed',
      );
    table
      .dateTime('last_run_ended_at')
      .nullable()
      .comment('The last time that the task ended');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function down(knex) {
  await knex.schema.alterTable('backstage_backend_tasks__tasks', table => {
    table.dropColumn('last_run_error_json');
    table.dropColumn('last_run_ended_at');
  });
};
