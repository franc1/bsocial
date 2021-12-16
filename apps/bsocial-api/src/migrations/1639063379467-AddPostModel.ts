import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPostModel1639063379467 implements MigrationInterface {
  name = 'AddPostModel1639063379467';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`post\` (\`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`id\` int NOT NULL AUTO_INCREMENT, \`content\` text NOT NULL, \`created_by_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`post\` ADD CONSTRAINT \`FK_8fb8e3151b539515ee611e5e8a5\` FOREIGN KEY (\`created_by_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`post\` DROP FOREIGN KEY \`FK_8fb8e3151b539515ee611e5e8a5\``,
    );
    await queryRunner.query(`DROP TABLE \`post\``);
  }
}
