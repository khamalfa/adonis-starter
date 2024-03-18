import { BaseSchema } from '@adonisjs/lucid/schema'
import { UserRole } from '../../app/enums/user_roles.js'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.string('full_name').nullable()
      table.string('email', 254).notNullable().unique()
      table.string('password').notNullable()
      table
        .enu('role', Object.values(UserRole), {
          useNative: true,
          enumName: 'user_role_enum',
          existingType: true,
        })
        .defaultTo('admin')
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
