import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserModel1639062506561 implements MigrationInterface {
  name = 'AddUserModel1639062506561';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`user\` (\`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`id\` int NOT NULL AUTO_INCREMENT, \`first_name\` varchar(100) NOT NULL, \`last_name\` varchar(100) NOT NULL, \`username\` varchar(100) NOT NULL, \`email\` varchar(150) NOT NULL, \`password\` varchar(150) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`user\``);
  }
}
