"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedProducts = seedProducts;
exports.seedProductsWithCategories = seedProductsWithCategories;
exports.clearProductsWithCascade = clearProductsWithCascade;
exports.clearProductsSafely = clearProductsSafely;
exports.seedProductsProduction = seedProductsProduction;
const faker_1 = require("@faker-js/faker");
const common_1 = require("../common");
const product_entity_1 = require("../modules/product/entities/product.entity");
async function seedProducts(dataSource) {
    const productRepository = dataSource.getRepository(product_entity_1.ProductEntity);
    const existingProducts = await productRepository.count();
    if (existingProducts > 0) {
        console.log(`Products already exist (${existingProducts}). Skipping seeding.`);
        return;
    }
    const products = [];
    const productCount = 100;
    for (let i = 0; i < productCount; i++) {
        const product = {
            name: faker_1.faker.commerce.productName(),
            price: parseFloat(faker_1.faker.commerce.price({ min: 50, max: 500, dec: 2 })),
            stock: faker_1.faker.number.int({ min: 0, max: 100 }),
            status: faker_1.faker.helpers.weightedArrayElement([
                { weight: 8, value: common_1.PRODUCT_STATUS.ACTIVE },
                { weight: 2, value: common_1.PRODUCT_STATUS.INACTIVE }
            ])
        };
        products.push(product);
    }
    for (const productData of products) {
        const product = new product_entity_1.ProductEntity();
        product.name = productData.name;
        product.price = productData.price;
        product.stock = productData.stock;
        product.status = productData.status;
        await productRepository.save(product);
    }
    console.log(`Successfully seeded ${productCount} products`);
}
async function seedProductsWithCategories(dataSource) {
    const productRepository = dataSource.getRepository(product_entity_1.ProductEntity);
    const existingProducts = await productRepository.count();
    if (existingProducts > 0) {
        console.log(`Products already exist (${existingProducts}). Skipping seeding.`);
        return;
    }
    const products = [];
    const productCount = 100;
    const categories = [
        { type: 'electronics', minPrice: 100, maxPrice: 1000 },
        { type: 'clothing', minPrice: 20, maxPrice: 200 },
        { type: 'books', minPrice: 10, maxPrice: 50 },
        { type: 'home', minPrice: 30, maxPrice: 300 },
        { type: 'sports', minPrice: 25, maxPrice: 250 }
    ];
    for (let i = 0; i < productCount; i++) {
        const category = faker_1.faker.helpers.arrayElement(categories);
        const product = {
            name: generateProductName(category.type),
            price: parseFloat(faker_1.faker.commerce.price({
                min: category.minPrice,
                max: category.maxPrice,
                dec: 2
            })),
            stock: faker_1.faker.number.int({ min: 0, max: 100 }),
            status: faker_1.faker.helpers.weightedArrayElement([
                { weight: 85, value: common_1.PRODUCT_STATUS.ACTIVE },
                { weight: 15, value: common_1.PRODUCT_STATUS.INACTIVE }
            ])
        };
        products.push(product);
    }
    const productEntities = products.map(productData => {
        const product = new product_entity_1.ProductEntity();
        product.name = productData.name;
        product.price = productData.price;
        product.stock = productData.stock;
        product.status = productData.status;
        return product;
    });
    await productRepository.save(productEntities);
    console.log(`Successfully seeded ${productCount} products with categories`);
}
function generateProductName(category) {
    const adjectives = [
        'Premium', 'Deluxe', 'Professional', 'Ultra', 'Advanced',
        'Essential', 'Classic', 'Modern', 'Compact', 'Wireless'
    ];
    const baseNames = {
        electronics: ['Smartphone', 'Laptop', 'Tablet', 'Headphones', 'Camera', 'Monitor', 'Keyboard', 'Mouse'],
        clothing: ['T-Shirt', 'Jeans', 'Dress', 'Jacket', 'Sneakers', 'Boots', 'Sweater', 'Shorts'],
        books: ['Novel', 'Textbook', 'Guide', 'Manual', 'Cookbook', 'Biography', 'History', 'Science'],
        home: ['Lamp', 'Cushion', 'Vase', 'Mirror', 'Clock', 'Candle', 'Rug', 'Plant Pot'],
        sports: ['Running Shoes', 'Yoga Mat', 'Dumbbells', 'Tennis Racket', 'Basketball', 'Helmet', 'Gloves', 'Water Bottle']
    };
    const adjective = faker_1.faker.helpers.arrayElement(adjectives);
    const baseName = faker_1.faker.helpers.arrayElement(baseNames[category]);
    const brand = faker_1.faker.company.name().split(' ')[0];
    return `${brand} ${adjective} ${baseName}`;
}
async function clearProductsWithCascade(dataSource) {
    const queryRunner = dataSource.createQueryRunner();
    try {
        await queryRunner.connect();
        await queryRunner.startTransaction();
        await queryRunner.query('SET session_replication_role = replica');
        await queryRunner.query('TRUNCATE TABLE "sale_item_entity" CASCADE');
        await queryRunner.query('TRUNCATE TABLE "product_entity" CASCADE');
        await queryRunner.query('SET session_replication_role = DEFAULT');
        await queryRunner.commitTransaction();
        console.log('Successfully cleared products with CASCADE');
    }
    catch (error) {
        await queryRunner.rollbackTransaction();
        throw error;
    }
    finally {
        await queryRunner.release();
    }
}
async function clearProductsSafely(dataSource) {
    const queryRunner = dataSource.createQueryRunner();
    try {
        await queryRunner.connect();
        await queryRunner.startTransaction();
        await queryRunner.query('DELETE FROM "sale_item_entity"');
        await queryRunner.query('DELETE FROM "product_entity"');
        await queryRunner.commitTransaction();
        console.log('Successfully cleared products safely');
    }
    catch (error) {
        await queryRunner.rollbackTransaction();
        throw error;
    }
    finally {
        await queryRunner.release();
    }
}
async function seedProductsProduction(dataSource) {
    const productRepository = dataSource.getRepository(product_entity_1.ProductEntity);
    const existingCount = await productRepository.count();
    if (existingCount >= 100) {
        console.log(`Sufficient products exist (${existingCount}). Skipping seeding.`);
        return;
    }
    const productsToCreate = 100 - existingCount;
    console.log(`Creating ${productsToCreate} additional products...`);
    const products = [];
    for (let i = 0; i < productsToCreate; i++) {
        const product = {
            name: faker_1.faker.commerce.productName(),
            price: parseFloat(faker_1.faker.commerce.price({ min: 50, max: 500, dec: 2 })),
            stock: faker_1.faker.number.int({ min: 0, max: 100 }),
            status: faker_1.faker.helpers.weightedArrayElement([
                { weight: 8, value: common_1.PRODUCT_STATUS.ACTIVE },
                { weight: 2, value: common_1.PRODUCT_STATUS.INACTIVE }
            ])
        };
        products.push(product);
    }
    const productEntities = products.map(productData => {
        const product = new product_entity_1.ProductEntity();
        product.name = productData.name;
        product.price = productData.price;
        product.stock = productData.stock;
        product.status = productData.status;
        return product;
    });
    await productRepository.save(productEntities);
    console.log(`Successfully seeded ${productsToCreate} products`);
}
//# sourceMappingURL=seed-products.seeder.js.map