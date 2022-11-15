import { MigrationInterface, QueryRunner } from "typeorm"

export class sontencesSetData1668275195570 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // https://www.convertcsv.com/csv-to-json.htm
        const inputs = [
            "This Sonoma Glue concentrate is a product that is usually used medically as anti-anxietys and anti-histamines. It has a strong aroma and helps with brain functions, calmness, and mood boosting. Packed with terpenes such as myrcene, linalool, and pinene, this strain is sure to stink up the room when opened. This strain usually clocks in at around 20% THC and 10% CBD",
            "This OG Chem shatter is a product that is usually used medically as anti-spasmodics and anti-virals. It has a strong aroma and helps with brain functions, calmness, and mood boosting. Packed with terpenes such as myrcene and terpinolene, this strain is sure to stink up the room when opened. This strain usually clocks in at around 28% THC and 11% CBD",
            "This Skywalker OG edible is a product that is usually used medically as anorectics and anti-virals. It has a strong aroma and helps with brain functions, calmness, and mood boosting. Packed with terpenes such as pinene, terpinolene, and myrcene, this strain is sure to stink up the room when opened. This strain usually clocks in at around 30% THC and 11% CBD",
            "This Critical Kush medical is a product that is usually used medically as decongestants and anti-inflammatorys. It has a strong aroma and helps with brain functions, calmness, and pain relief. Packed with terpenes such as terpinolene, pinene, and carophyllene, this strain is sure to stink up the room when opened. This strain usually clocks in at around 30% THC and 11% CBD",
            "This Diablo OG seeds & clone is a product that is usually used medically as anti-psoriatics and analgesics. It has a strong aroma and helps with stress relief, alertness, and brain functions. Packed with terpenes such as myrcene, linalool, and carophyllene, this strain is sure to stink up the room when opened. This strain usually clocks in at around 22% THC and 10% CBD",
            "This Super Silver Haze tincture is a product that is usually used medically as anti-bacterials and anti-spasmodics. It has a strong aroma and helps with brain functions, calmness, and mood boosting. Packed with terpenes such as linalool, myrcene, and humulene, this strain is sure to stink up the room when opened. This strain usually clocks in at around 27% THC and 12% CBD",
            "This Lime #5 vape pen is a product that is usually used medically as anti-virals and anti-insomnias. It has a strong aroma and helps with brain functions and mood boosting. Packed with terpenes such as myrcene, this strain is sure to stink up the room when opened. This strain usually clocks in at around 20% THC and 14% CBD",
            "This Pink Lotus medical is a product that is usually used medically as intestinal anti-prokinetics and anti-insomnias. It has a strong aroma and helps with alertness, calmness, and pain relief. Packed with terpenes such as carophyllene and linalool, this strain is sure to stink up the room when opened. This strain usually clocks in at around 27% THC and 13% CBD",
            "This Strawberry Shortcake edible is a product that is usually used medically as bone stimulants and anti-histamines. It has a strong aroma and helps with brain functions, calmness, and reduced appetite. Packed with terpenes such as carophyllene, terpinolene, and linalool, this strain is sure to stink up the room when opened. This strain usually clocks in at around 23% THC and 13% CBD",
            "This Whitewalker OG concentrate is a product that is usually used medically as anti-emetics and anti-bacterials. It has a strong aroma and helps with brain functions, alertness, and calmness. Packed with terpenes such as pinene, terpinolene, and carophyllene, this strain is sure to stink up the room when opened. This strain usually clocks in at around 26% THC and 12% CBD",
            "This Blackberry Cookies ice hash is a product that is usually used medically as immunoregulations and decongestants. It has a strong aroma and helps with calmness, stress relief, and brain functions. Packed with terpenes such as terpinolene, linalool, and carophyllene, this strain is sure to stink up the room when opened. This strain usually clocks in at around 21% THC and 10% CBD",
            "This Chem Berry concentrate is a product that is usually used medically as anti-depressants and anorectics. It has a strong aroma and helps with pain relief and reduced appetite. Packed with terpenes such as linalool, this strain is sure to stink up the room when opened. This strain usually clocks in at around 27% THC and 13% CBD",
            "This Lucky Charms live resin is a product that is usually used medically as anti-diabetics and anti-septics. It has a strong aroma and helps with brain functions and mood boosting. Packed with terpenes such as myrcene, this strain is sure to stink up the room when opened. This strain usually clocks in at around 18% THC and 15% CBD",
            "This Panama Punch edible is a product that is usually used medically as anti-diabetics and anti-spasmodics. It has a strong aroma and helps with mood boosting and pain relief. Packed with terpenes such as pinene, this strain is sure to stink up the room when opened. This strain usually clocks in at around 25% THC and 12% CBD",
            "This Sunset Sherbert crystalline is a product that is usually used medically as anti-spasmodics and decongestants. It has a strong aroma and helps with reduced appetite, brain functions, and calmness. Packed with terpenes such as linalool, pinene, and myrcene, this strain is sure to stink up the room when opened. This strain usually clocks in at around 25% THC and 11% CBD",
            "This Ghost OG medical is a product that is usually used medically as immunoregulations and anti-ischemics. It has a strong aroma and helps with mood boosting and stress relief. Packed with terpenes such as humulene, this strain is sure to stink up the room when opened. This strain usually clocks in at around 24% THC and 11% CBD",
            "This Candy Skunk ice hash is a product that is usually used medically as anti-stresss and anti-diabetics. It has a strong aroma and helps with brain functions, mood boosting, and reduced appetite. Packed with terpenes such as linalool and myrcene, this strain is sure to stink up the room when opened. This strain usually clocks in at around 22% THC and 15% CBD",
            "This Chronic distillate is a product that is usually used medically as anti-fungals and anti-psoriatics. It has a strong aroma and helps with mood boosting, brain functions, and calmness. Packed with terpenes such as myrcene and pinene, this strain is sure to stink up the room when opened. This strain usually clocks in at around 23% THC and 10% CBD"
        ];

        let inserts = [];

        for (const text of inputs) {
            inserts.push({
                text: text,
                hash: 'dumyy',
                createdAt: new Date(),
                updatedAt: new Date(),
            });
        }

        await queryRunner
            .manager
            .createQueryBuilder()
            .insert()
            .into("sentences_set")
            .values(inserts)
            .execute();
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner
            .manager
            .createQueryBuilder()
            .delete()
            .from("sentences_set")
            .execute();
    }

}
