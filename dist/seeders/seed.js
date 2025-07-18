"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_config_1 = require("../config/typeorm.config");
const seed_roles_seeder_1 = require("./seed-roles.seeder");
const seed_customers_seeder_1 = require("./seed-customers.seeder");
const seed_products_seeder_1 = require("./seed-products.seeder");
async function runSeed() {
    try {
        await typeorm_config_1.AppDataSource.initialize();
        console.log('Data Source has been initialized.');
        await (0, seed_roles_seeder_1.seedRoles)(typeorm_config_1.AppDataSource);
        console.log('Roles and permissions have been seeded.');
        await (0, seed_customers_seeder_1.seedCustomers)(typeorm_config_1.AppDataSource);
        console.log('Customers have been seeded.');
        await (0, seed_products_seeder_1.seedProducts)(typeorm_config_1.AppDataSource);
        console.log('Products have been seeded.');
        await typeorm_config_1.AppDataSource.destroy();
        console.log('Data Source has been destroyed.');
    }
    catch (error) {
        console.error('Error during seeding:', error);
        process.exit(1);
    }
}
void runSeed();
//# sourceMappingURL=seed.js.map