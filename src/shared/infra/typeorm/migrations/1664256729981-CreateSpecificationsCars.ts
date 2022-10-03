import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateSpecificationsCars1664256729981 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "specifications_cars",
                columns: [
                    {
                        name: "car_id",
                        type: "uuid"
                    },
                    {
                        name: "specifications_id",
                        type: "uuid"
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    }
                ]
            })
        )
        await queryRunner.createForeignKey(
            "specifications_cars",
            new TableForeignKey({
                name: "FKSpecificationCar",
                referencedTableName: "Specification",
                referencedColumnNames: ["id"],
                columnNames:["Specification_id"],
                onDelete: "SET_NULL",
                onUpdate: "SET_NULL",

            })
        );

        await queryRunner.createForeignKey(
            "specifications_cars",
            new TableForeignKey({
                name: "FKCarSpecification",
                referencedTableName: "cars",
                referencedColumnNames: ["id"],
                columnNames:["car_id"],
                onDelete: "SET_NULL",
                onUpdate: "SET_NULL",

            })
        )


    }


    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey(
            "specifications_cars", "FKCarSpecification"
        )
        await queryRunner.dropForeignKey(
            "specifications_cars", "FKSpecificationCar"
        )

        await queryRunner.dropTable("specifications_cars")
    }

}
