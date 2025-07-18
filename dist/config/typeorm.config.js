"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const common_1 = require("../common");
const typeorm_1 = require("typeorm");
exports.AppDataSource = new typeorm_1.DataSource({
    type: common_1.DB_TYPE,
    host: common_1.DB_HOST,
    ssl: common_1.DB_SSL_MODE === 'require',
    port: Number(common_1.DB_PORT),
    username: common_1.DB_USERNAME,
    password: common_1.DB_PASSWORD,
    database: common_1.DB_NAME,
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    migrations: [__dirname + '/../**/migrations/*{.ts,.js}'],
    migrationsRun: false,
    logging: common_1.NODE_ENV === 'development',
});
//# sourceMappingURL=typeorm.config.js.map