import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createUsersTable1605559659092 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('create extension if not exists "uuid-ossp";');

    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isNullable: false,
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'first_name',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'last_name',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'cpf',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'email',
            type: 'varchar',
            isUnique: true,
            isNullable: false,
          },
          {
            name: 'password',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'role',
            type: 'enum',
            enumName: 'roles',
            enum: [
              'super_admin',
              'admin',
              'financial_1',
              'financial_2',
              'concierge',
              'track_operator',
              'radio_operator',
              'fuel_operator',
              'security_operator',
              'employment_operator',
            ],
            isNullable: true,
          },
          {
            name: 'isCustomCapabilities',
            type: 'boolean',
            default: false,
            isNullable: true,
          },
          {
            name: 'isActive',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp with time zone',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp with time zone',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
