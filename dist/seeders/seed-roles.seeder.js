"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedRoles = seedRoles;
const permission_entity_1 = require("../modules/auth/entities/permission.entity");
const role_entity_1 = require("../modules/auth/entities/role.entity");
const user_entity_1 = require("../modules/user/entities/user.entity");
const bcrypt = require("bcrypt");
async function seedRoles(dataSource) {
    const permissionRepo = dataSource.getRepository(permission_entity_1.PermissionsEntity);
    const roleRepo = dataSource.getRepository(role_entity_1.RolesEntity);
    const customerRepo = dataSource.getRepository(user_entity_1.CustomerEntity);
    const permissionNames = [
        'MANAGE_USERS',
        'MANAGE_ROLES',
        'VIEW_PRODUCTS',
        'MANAGE_PRODUCTS',
        'DELETE_PRODUCTS',
        'CREATE_SALES',
        'VIEW_SALES',
        'VIEW_OWN_SALES',
        'UPDATE_STOCKS',
        'VIEW_USERS',
        'UPDATE_SELF',
    ];
    const permissionEntities = permissionNames.map((name) => permissionRepo.create({ name }));
    await permissionRepo.save(permissionEntities);
    const getPermissions = (...names) => permissionEntities.filter((p) => names.includes(p.name));
    const roles = [
        {
            name: 'ADMIN',
            permissions: getPermissions('MANAGE_ROLES', 'VIEW_PRODUCTS', 'MANAGE_PRODUCTS', 'DELETE_PRODUCTS', 'UPDATE_STOCKS', 'MANAGE_USERS', 'VIEW_USERS', 'CREATE_SALES', 'VIEW_SALES', 'UPDATE_SELF'),
        },
        {
            name: 'MANAGER',
            permissions: getPermissions('VIEW_PRODUCTS', 'MANAGE_PRODUCTS', 'CREATE_SALES', 'VIEW_SALES', 'UPDATE_STOCKS', 'VIEW_USERS', 'UPDATE_SELF'),
        },
        {
            name: 'CUSTOMER',
            permissions: getPermissions('VIEW_PRODUCTS', 'CREATE_SALES', 'VIEW_OWN_SALES', 'UPDATE_SELF', 'VIEW_SALES'),
        },
    ];
    const rolesEntity = roles.map((r) => roleRepo.create(r));
    await roleRepo.save(rolesEntity);
    const adminRole = rolesEntity.find((r) => r.name === 'ADMIN');
    if (!adminRole) {
        throw new Error('ADMIN role was not created');
    }
    const existingAdmin = await customerRepo.findOne({
        where: { email: 'admin@admin.com' },
    });
    if (!existingAdmin) {
        const hashedPassword = await bcrypt.hash('Admin@1234', 10);
        const adminUser = customerRepo.create({
            name: 'Default Admin',
            email: 'admin@admin.com',
            phone: '1234567890',
            password: hashedPassword,
            isActive: true,
            role: adminRole,
        });
        await customerRepo.save(adminUser);
        console.log('Default admin user created with email admin@example.com and password Admin@1234');
    }
    else {
        console.log('Admin user already exists, skipping creation');
    }
}
//# sourceMappingURL=seed-roles.seeder.js.map