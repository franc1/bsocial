import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserFollowersTable1639125864707 implements MigrationInterface {
  name = 'AddUserFollowersTable1639125864707';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`user_follower\` (\`follower_id\` int NOT NULL, \`followed_id\` int NOT NULL, INDEX \`IDX_4d9336aa720daf9f7f1f852f3c\` (\`follower_id\`), INDEX \`IDX_9b8e5d066e8138e8d4a86db791\` (\`followed_id\`), PRIMARY KEY (\`follower_id\`, \`followed_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_follower\` ADD CONSTRAINT \`FK_4d9336aa720daf9f7f1f852f3c0\` FOREIGN KEY (\`follower_id\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_follower\` ADD CONSTRAINT \`FK_9b8e5d066e8138e8d4a86db7918\` FOREIGN KEY (\`followed_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user_follower\` DROP FOREIGN KEY \`FK_9b8e5d066e8138e8d4a86db7918\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_follower\` DROP FOREIGN KEY \`FK_4d9336aa720daf9f7f1f852f3c0\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_9b8e5d066e8138e8d4a86db791\` ON \`user_follower\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_4d9336aa720daf9f7f1f852f3c\` ON \`user_follower\``,
    );
    await queryRunner.query(`DROP TABLE \`user_follower\``);
  }
}
