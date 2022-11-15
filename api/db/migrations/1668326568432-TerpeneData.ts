import { MigrationInterface, QueryRunner } from "typeorm"

export class TerpeneData1668326568432 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const inputs = [
            'myrcene',
            'beta caryophyllene',
            'caryophyllene',
            'limonene',
            'linalool',
            'pinene',
            'humulene',
            'terpinolene',
            'alpha bisabolol',
            'bisabolol',
            'eucalyptol',
            'geraniol',
            'terpineol',
            'farnesene',
            'borneol',
            'ocimene',
            'nerolidol',
            'guaiol',
            'valencene',
            'delta 3 carene',
            'carene',
            'phytol',
            'sabinene',
            'phellandrene',
            'fenchol',
            'menthol',
            'terpinene',
            'isoborneol',
            'cymene',
            'octanol',
            'isopulegol',
            'cedrene',
            'camphene',
            'geranyl acetate',
            'acetate',
            'bergamotene',
            'camphor',
            'pulegon'
        ];

        let inserts = [];

        for (const text of inputs) {
            inserts.push({
                name: text,
                createdAt: new Date(),
                updatedAt: new Date(),
            });
        }

        await queryRunner
            .manager
            .createQueryBuilder()
            .insert()
            .into("terpene")
            .values(inserts)
            .execute();
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner
            .manager
            .createQueryBuilder()
            .delete()
            .from("terpene")
            .execute();
    }

}
