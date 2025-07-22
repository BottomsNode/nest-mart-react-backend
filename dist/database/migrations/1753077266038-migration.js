"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration1753077266038 = void 0;
class Migration1753077266038 {
    name = 'Migration1753077266038';
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "permission" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying NOT NULL, CONSTRAINT "UQ_240853a0c3353c25fb12434ad33" UNIQUE ("name"), CONSTRAINT "PK_3b8b97af9d9d8807e41e6f48362" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "roles" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying NOT NULL, CONSTRAINT "UQ_648e3f5447f725579d7d4ffdfb7" UNIQUE ("name"), CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product_entity" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying NOT NULL, "price" numeric(10,2) NOT NULL, "stock" integer NOT NULL DEFAULT '15', "status" "public"."product_status_enum" NOT NULL DEFAULT '1', CONSTRAINT "PK_6e8f75045ddcd1c389c765c896e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sale_item_entity" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "quantity" integer NOT NULL, "priceAtPurchase" numeric(10,2) NOT NULL, "saleId" integer, "productId" integer, CONSTRAINT "PK_de4b3129461f8bc27b6110e5c7b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sale_entity" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "saleDate" TIMESTAMP NOT NULL DEFAULT now(), "totalAmount" numeric(10,2) NOT NULL, "customerId" integer, CONSTRAINT "PK_7ae2505a1ce8e5b5342d4d4d99c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "customer_entity" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying NOT NULL, "phone" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "roleId" integer, "addressId" integer, CONSTRAINT "UQ_984b2b39df96ed36ab62e7834a3" UNIQUE ("email"), CONSTRAINT "REL_ffa82dbf045e7bee5af6a3dfb3" UNIQUE ("addressId"), CONSTRAINT "PK_8898b6830f057f3f5c239796fa7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "address_entity" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "street" character varying NOT NULL, "city" character varying NOT NULL, "pincode" character varying NOT NULL, CONSTRAINT "PK_9caf3f954ed5bc66e3fa35eb7e9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "roles_permissions_permission" ("rolesId" integer NOT NULL, "permissionId" integer NOT NULL, CONSTRAINT "PK_79cc18fb5daa354400686fb6680" PRIMARY KEY ("rolesId", "permissionId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_a740421f76d0df27723db697ae" ON "roles_permissions_permission" ("rolesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_ea2b57117f371a484bc086819a" ON "roles_permissions_permission" ("permissionId") `);
        await queryRunner.query(`ALTER TABLE "sale_item_entity" ADD CONSTRAINT "FK_bbcf71d9e99c8f6845bf7c445df" FOREIGN KEY ("saleId") REFERENCES "sale_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sale_item_entity" ADD CONSTRAINT "FK_9f2c0b271eb428ddd9e1f2656b5" FOREIGN KEY ("productId") REFERENCES "product_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sale_entity" ADD CONSTRAINT "FK_2753eeb4efae5f96d5d169d6f55" FOREIGN KEY ("customerId") REFERENCES "customer_entity"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "customer_entity" ADD CONSTRAINT "FK_714b5aee2f0b27ffd1211f03568" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "customer_entity" ADD CONSTRAINT "FK_ffa82dbf045e7bee5af6a3dfb38" FOREIGN KEY ("addressId") REFERENCES "address_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "roles_permissions_permission" ADD CONSTRAINT "FK_a740421f76d0df27723db697ae9" FOREIGN KEY ("rolesId") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "roles_permissions_permission" ADD CONSTRAINT "FK_ea2b57117f371a484bc086819a8" FOREIGN KEY ("permissionId") REFERENCES "permission"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "roles_permissions_permission" DROP CONSTRAINT "FK_ea2b57117f371a484bc086819a8"`);
        await queryRunner.query(`ALTER TABLE "roles_permissions_permission" DROP CONSTRAINT "FK_a740421f76d0df27723db697ae9"`);
        await queryRunner.query(`ALTER TABLE "customer_entity" DROP CONSTRAINT "FK_ffa82dbf045e7bee5af6a3dfb38"`);
        await queryRunner.query(`ALTER TABLE "customer_entity" DROP CONSTRAINT "FK_714b5aee2f0b27ffd1211f03568"`);
        await queryRunner.query(`ALTER TABLE "sale_entity" DROP CONSTRAINT "FK_2753eeb4efae5f96d5d169d6f55"`);
        await queryRunner.query(`ALTER TABLE "sale_item_entity" DROP CONSTRAINT "FK_9f2c0b271eb428ddd9e1f2656b5"`);
        await queryRunner.query(`ALTER TABLE "sale_item_entity" DROP CONSTRAINT "FK_bbcf71d9e99c8f6845bf7c445df"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ea2b57117f371a484bc086819a"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a740421f76d0df27723db697ae"`);
        await queryRunner.query(`DROP TABLE "roles_permissions_permission"`);
        await queryRunner.query(`DROP TABLE "address_entity"`);
        await queryRunner.query(`DROP TABLE "customer_entity"`);
        await queryRunner.query(`DROP TABLE "sale_entity"`);
        await queryRunner.query(`DROP TABLE "sale_item_entity"`);
        await queryRunner.query(`DROP TABLE "product_entity"`);
        await queryRunner.query(`DROP TABLE "roles"`);
        await queryRunner.query(`DROP TABLE "permission"`);
    }
}
exports.Migration1753077266038 = Migration1753077266038;
//# sourceMappingURL=1753077266038-migration.js.map