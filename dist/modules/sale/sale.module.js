"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaleModule = void 0;
const common_1 = require("@nestjs/common");
const sale_controller_1 = require("./controllers/sale.controller");
const sale_service_1 = require("./sale.service");
const typeorm_1 = require("@nestjs/typeorm");
const sales_entity_1 = require("./entities/sales/sales.entity");
const sale_item_entity_1 = require("./entities/items/sale-item.entity");
const saleItem_controller_1 = require("./controllers/saleItem.controller");
const saleItem_service_1 = require("./saleItem.service");
const sales_repository_1 = require("./repository/sales.repository");
const salesItem_repository_1 = require("./repository/salesItem.repository");
const product_repository_1 = require("../product/repository/product.repository");
const product_module_1 = require("../product/product.module");
const product_entity_1 = require("../product/entities/product.entity");
const user_repository_1 = require("../user/repository/user.repository");
const user_entity_1 = require("../user/entities/user.entity");
let SaleModule = class SaleModule {
};
exports.SaleModule = SaleModule;
exports.SaleModule = SaleModule = __decorate([
    (0, common_1.Module)({
        imports: [
            product_module_1.ProductModule,
            typeorm_1.TypeOrmModule.forFeature([sales_entity_1.SaleEntity, sale_item_entity_1.SaleItemEntity, product_entity_1.ProductEntity, user_entity_1.CustomerEntity]),
        ],
        controllers: [sale_controller_1.SaleController, saleItem_controller_1.SaleItemController],
        providers: [
            sale_service_1.SaleService,
            saleItem_service_1.SaleItemService,
            {
                provide: 'SalesRepository',
                useClass: sales_repository_1.SalesRepository,
            },
            {
                provide: 'SalesItemRepository',
                useClass: salesItem_repository_1.SalesItemRepository,
            },
            {
                provide: 'ProductRepository',
                useClass: product_repository_1.ProductRepository,
            },
            {
                provide: 'UserRepository',
                useClass: user_repository_1.UserRepository,
            },
        ],
    })
], SaleModule);
//# sourceMappingURL=sale.module.js.map