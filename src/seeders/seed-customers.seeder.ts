import { faker } from '@faker-js/faker';
import * as bcrypt from 'bcrypt';
import { CustomerEntity } from '../modules/user/entities/user.entity';
import { DataSource } from 'typeorm';
import { AddressEntity } from '../modules/address/entities/address.entity';
import { RolesEntity } from '../modules/auth/entities/role.entity';

export async function seedCustomers(dataSource: DataSource) {
  const customerRepository = dataSource.getRepository(CustomerEntity);
  const roleRepository = dataSource.getRepository(RolesEntity);

  const customerRole = await roleRepository.findOne({ where: { id: 3 } });
  if (!customerRole) {
    throw new Error('Role with id 3 not found.');
  }

  const plainPassword = 'customer123';
  const hashedPassword = await bcrypt.hash(plainPassword, 10);

  const customers: Partial<CustomerEntity>[] = [];

  for (let i = 0; i < 10; i++) {
    const customer = new CustomerEntity();
    customer.name = faker.person.fullName();

    const phonePrefix = faker.helpers.arrayElement(['9', '8', '7']);
    const phoneRest = faker.string.numeric(9);
    customer.phone = phonePrefix + phoneRest;

    customer.email = faker.internet.email();
    customer.password = hashedPassword;
    customer.isActive = true;
    customer.role = customerRole;

    const address = new AddressEntity();
    address.street = faker.location.streetAddress();
    address.city = faker.location.city();
    address.pincode = faker.location.zipCode();

    address.customer = customer;
    customer.address = address;

    customers.push(customer);
  }

  await customerRepository.save(customers);
  console.log('✅ Customers have been seeded.');
  console.log(`🔑 All customers have password: "${plainPassword}"`);
}
