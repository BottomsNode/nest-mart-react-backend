import { faker } from '@faker-js/faker';
import { PRODUCT_STATUS } from 'src/common';
import { ProductEntity } from '../modules/product/entities/product.entity';
import { DataSource } from 'typeorm';

interface ProductData {
  name: string;
  price: number;
  stock: number;
  status: number;
}

export async function seedProducts(dataSource: DataSource) {
  const productRepository = dataSource.getRepository(ProductEntity);

  // Option 1: Check if products already exist before seeding
  const existingProducts = await productRepository.count();
  if (existingProducts > 0) {
    console.log(
      `Products already exist (${existingProducts}). Skipping seeding.`,
    );
    return;
  }

  // Option 2: Clear with CASCADE (use carefully in production)
  // await clearProductsWithCascade(dataSource);

  // Option 3: Delete using DELETE instead of TRUNCATE
  // await productRepository.delete({});

  const products: ProductData[] = [];
  const productCount = 50;

  // Generate random products using Faker
  for (let i = 0; i < productCount; i++) {
    const product = {
      name: faker.commerce.productName(),
      price: parseFloat(faker.commerce.price({ min: 50, max: 500, dec: 2 })),
      stock: faker.number.int({ min: 0, max: 100 }),
      status: faker.helpers.weightedArrayElement([
        { weight: 8, value: PRODUCT_STATUS.ACTIVE },
        { weight: 2, value: PRODUCT_STATUS.INACTIVE },
      ]),
    };
    products.push(product);
  }

  // Save products to database
  for (const productData of products) {
    const product = new ProductEntity();
    product.name = productData.name;
    product.price = productData.price;
    product.stock = productData.stock;
    product.status = productData.status;

    await productRepository.save(product);
  }

  console.log(`Successfully seeded ${productCount} products`);
}

// Alternative version with categories and more realistic data
export async function seedProductsWithCategories(dataSource: DataSource) {
  const productRepository = dataSource.getRepository(ProductEntity);

  // Check if products already exist
  const existingProducts = await productRepository.count();
  if (existingProducts > 0) {
    console.log(
      `Products already exist (${existingProducts}). Skipping seeding.`,
    );
    return;
  }

  const products: ProductData[] = [];
  const productCount = 100;

  // Define product categories with their typical price ranges
  const categories = [
    { type: 'electronics', minPrice: 100, maxPrice: 1000 },
    { type: 'clothing', minPrice: 20, maxPrice: 200 },
    { type: 'books', minPrice: 10, maxPrice: 50 },
    { type: 'home', minPrice: 30, maxPrice: 300 },
    { type: 'sports', minPrice: 25, maxPrice: 250 },
  ];

  for (let i = 0; i < productCount; i++) {
    const category = faker.helpers.arrayElement(categories);

    const product = {
      name: generateProductName(category.type),
      price: parseFloat(
        faker.commerce.price({
          min: category.minPrice,
          max: category.maxPrice,
          dec: 2,
        }),
      ),
      stock: faker.number.int({ min: 0, max: 100 }),
      status: faker.helpers.weightedArrayElement([
        { weight: 85, value: PRODUCT_STATUS.ACTIVE },
        { weight: 15, value: PRODUCT_STATUS.INACTIVE },
      ]),
    };
    products.push(product);
  }

  // Batch save for better performance
  const productEntities = products.map((productData) => {
    const product = new ProductEntity();
    product.name = productData.name;
    product.price = productData.price;
    product.stock = productData.stock;
    product.status = productData.status;
    return product;
  });

  await productRepository.save(productEntities);
  console.log(`Successfully seeded ${productCount} products with categories`);
}

function generateProductName(category: string): string {
  const adjectives = [
    'Premium',
    'Deluxe',
    'Professional',
    'Ultra',
    'Advanced',
    'Essential',
    'Classic',
    'Modern',
    'Compact',
    'Wireless',
  ];

  const baseNames = {
    electronics: [
      'Smartphone',
      'Laptop',
      'Tablet',
      'Headphones',
      'Camera',
      'Monitor',
      'Keyboard',
      'Mouse',
    ],
    clothing: [
      'T-Shirt',
      'Jeans',
      'Dress',
      'Jacket',
      'Sneakers',
      'Boots',
      'Sweater',
      'Shorts',
    ],
    books: [
      'Novel',
      'Textbook',
      'Guide',
      'Manual',
      'Cookbook',
      'Biography',
      'History',
      'Science',
    ],
    home: [
      'Lamp',
      'Cushion',
      'Vase',
      'Mirror',
      'Clock',
      'Candle',
      'Rug',
      'Plant Pot',
    ],
    sports: [
      'Running Shoes',
      'Yoga Mat',
      'Dumbbells',
      'Tennis Racket',
      'Basketball',
      'Helmet',
      'Gloves',
      'Water Bottle',
    ],
  };

  // Ensure the category is valid, otherwise default to 'electronics'
  if (!(category in baseNames)) {
    console.warn(
      `Invalid category '${category}', defaulting to 'electronics'.`,
    );
    category = 'electronics';
  }

  const adjective = faker.helpers.arrayElement(adjectives);
  const baseName = faker.helpers.arrayElement(
    baseNames[category as keyof typeof baseNames],
  );
  const brand = faker.company.name().split(' ')[0];

  return `${brand} ${adjective} ${baseName}`;
}

// Helper function to safely clear products with foreign key constraints
export async function clearProductsWithCascade(dataSource: DataSource) {
  const queryRunner = dataSource.createQueryRunner();

  try {
    await queryRunner.connect();
    await queryRunner.startTransaction();

    // Disable foreign key checks temporarily
    await queryRunner.query('SET session_replication_role = replica');

    // Clear related tables first (adjust table names as needed)
    await queryRunner.query('TRUNCATE TABLE "sale_item_entity" CASCADE');
    await queryRunner.query('TRUNCATE TABLE "product_entity" CASCADE');

    // Re-enable foreign key checks
    await queryRunner.query('SET session_replication_role = DEFAULT');

    await queryRunner.commitTransaction();
    console.log('Successfully cleared products with CASCADE');
  } catch (error) {
    await queryRunner.rollbackTransaction();
    throw error;
  } finally {
    await queryRunner.release();
  }
}

// Alternative: Clear using DELETE with proper order
export async function clearProductsSafely(dataSource: DataSource) {
  const queryRunner = dataSource.createQueryRunner();

  try {
    await queryRunner.connect();
    await queryRunner.startTransaction();

    // Delete in proper order (child tables first)
    await queryRunner.query('DELETE FROM "sale_item_entity"');
    await queryRunner.query('DELETE FROM "product_entity"');

    await queryRunner.commitTransaction();
    console.log('Successfully cleared products safely');
  } catch (error) {
    await queryRunner.rollbackTransaction();
    throw error;
  } finally {
    await queryRunner.release();
  }
}

// Production-safe seeder that handles existing data
export async function seedProductsProduction(dataSource: DataSource) {
  const productRepository = dataSource.getRepository(ProductEntity);

  // Check if we need to seed
  const existingCount = await productRepository.count();
  if (existingCount >= 100) {
    console.log(
      `Sufficient products exist (${existingCount}). Skipping seeding.`,
    );
    return;
  }

  // Calculate how many more products we need
  const productsToCreate = 100 - existingCount;
  console.log(`Creating ${productsToCreate} additional products...`);

  const products: ProductData[] = [];

  for (let i = 0; i < productsToCreate; i++) {
    const product = {
      name: faker.commerce.productName(),
      price: parseFloat(faker.commerce.price({ min: 50, max: 500, dec: 2 })),
      stock: faker.number.int({ min: 0, max: 100 }),
      status: faker.helpers.weightedArrayElement([
        { weight: 8, value: PRODUCT_STATUS.ACTIVE },
        { weight: 2, value: PRODUCT_STATUS.INACTIVE },
      ]),
    };
    products.push(product);
  }

  // Batch save
  const productEntities = products.map((productData) => {
    const product = new ProductEntity();
    product.name = productData.name;
    product.price = productData.price;
    product.stock = productData.stock;
    product.status = productData.status;
    return product;
  });

  await productRepository.save(productEntities);
  console.log(`Successfully seeded ${productsToCreate} products`);
}
