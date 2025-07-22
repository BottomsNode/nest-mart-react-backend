"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_module_1 = require("./modules/auth/auth.module");
const address_module_1 = require("./modules/address/address.module");
const product_module_1 = require("./modules/product/product.module");
const sale_module_1 = require("./modules/sale/sale.module");
const connection_msg_1 = require("./config/connection.msg");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_config_1 = require("./config/typeorm.config");
const config_1 = require("@nestjs/config");
const nestjs_1 = require("@automapper/nestjs");
const common_2 = require("./common");
const user_controller_1 = require("./modules/user/user.controller");
const address_controller_1 = require("./modules/address/address.controller");
const product_controller_1 = require("./modules/product/product.controller");
const sale_controller_1 = require("./modules/sale/controllers/sale.controller");
const saleItem_controller_1 = require("./modules/sale/controllers/saleItem.controller");
const profile_module_1 = require("./modules/profile/profile.module");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
const platform_express_1 = require("@nestjs/platform-express");
let AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply(common_2.AuthMiddleware)
            .exclude({
            path: '/user/password/reset',
            method: common_1.RequestMethod.PUT,
        })
            .forRoutes(user_controller_1.UserController, address_controller_1.AddressController, product_controller_1.ProductController, sale_controller_1.SaleController, saleItem_controller_1.SaleItemController);
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(),
            typeorm_1.TypeOrmModule.forRoot(typeorm_config_1.AppDataSource.options),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', 'uploads'),
                serveRoot: '/uploads',
            }),
            platform_express_1.MulterModule.register({
                dest: './uploads',
            }),
            nestjs_1.AutomapperModule,
            auth_module_1.AuthModule,
            address_module_1.AddressModule,
            product_module_1.ProductModule,
            sale_module_1.SaleModule,
            profile_module_1.ProfileModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, connection_msg_1.DatabaseService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map