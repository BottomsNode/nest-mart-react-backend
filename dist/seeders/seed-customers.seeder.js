"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedCustomers = seedCustomers;
const faker_1 = require("@faker-js/faker");
const bcrypt = require("bcrypt");
const user_entity_1 = require("../modules/user/entities/user.entity");
const address_entity_1 = require("../modules/address/entities/address.entity");
const role_entity_1 = require("../modules/auth/entities/role.entity");
async function seedCustomers(dataSource) {
    const customerRepository = dataSource.getRepository(user_entity_1.CustomerEntity);
    const roleRepository = dataSource.getRepository(role_entity_1.RolesEntity);
    const customerRole = await roleRepository.findOne({ where: { id: 3 } });
    if (!customerRole) {
        throw new Error('Role with id 3 not found.');
    }
    const plainPassword = 'customer123';
    const hashedPassword = await bcrypt.hash(plainPassword, 10);
    const customers = [];
    for (let i = 0; i < 10; i++) {
        const customer = new user_entity_1.CustomerEntity();
        customer.name = faker_1.faker.person.fullName();
        const phonePrefix = faker_1.faker.helpers.arrayElement(['9', '8', '7']);
        const phoneRest = faker_1.faker.string.numeric(9);
        customer.phone = phonePrefix + phoneRest;
        customer.email = faker_1.faker.internet.email();
        customer.password = hashedPassword;
        customer.isActive = true;
        customer.role = customerRole;
        const address = new address_entity_1.AddressEntity();
        address.street = faker_1.faker.location.streetAddress();
        address.city = faker_1.faker.location.city();
        address.pincode = faker_1.faker.location.zipCode();
        address.customer = customer;
        customer.address = address;
        customers.push(customer);
    }
    await customerRepository.save(customers);
    console.log('✅ Customers have been seeded.');
    console.log(`🔑 All customers have password: "${plainPassword}"`);
}
//# sourceMappingURL=seed-customers.seeder.js.map