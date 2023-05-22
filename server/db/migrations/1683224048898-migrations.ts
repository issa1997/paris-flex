import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1683224048898 implements MigrationInterface {
  name = 'Migrations1683224048898';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`bookings\` (\`id\` int NOT NULL AUTO_INCREMENT, \`pickUpLocation\` varchar(255) NOT NULL, \`dropOffLocation\` varchar(255) NOT NULL, \`passengerId\` int NOT NULL, \`pickUpDate\` varchar(255) NOT NULL, \`PickUpTime\` varchar(255) NOT NULL, \`rateId\` int NOT NULL, \`tripType\` enum ('round_trip', 'one_way') NOT NULL DEFAULT 'one_way', \`luggagePieces\` int NOT NULL, \`bookingRefId\` varchar(255) NOT NULL, \`isDelete\` tinyint NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`rates\` (\`id\` int NOT NULL AUTO_INCREMENT, \`fromLocation\` int NOT NULL, \`toLocation\` varchar(255) NOT NULL, \`packageName\` varchar(255) NOT NULL, \`passengerCount\` int NOT NULL, \`price\` int NOT NULL, \`isDelete\` tinyint NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`passengers\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`lastName\` varchar(255) NOT NULL, \`email\` int NOT NULL, \`phone\` varchar(255) NOT NULL, \`passengerCount\` int NOT NULL, \`travelNumber\` varchar(255) NOT NULL, \`travelFrom\` varchar(255) NOT NULL, \`isDelete\` tinyint NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`passengers\``);
    await queryRunner.query(`DROP TABLE \`rates\``);
    await queryRunner.query(`DROP TABLE \`bookings\``);
  }
}
