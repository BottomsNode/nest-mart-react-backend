"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MAX_PROFILE_PICTURE_SIZE_IN_BYTES = exports.Pagination_Length = exports.PERMISSION_KEY = exports.PRODUCT_STATUS = void 0;
var PRODUCT_STATUS;
(function (PRODUCT_STATUS) {
    PRODUCT_STATUS[PRODUCT_STATUS["ACTIVE"] = 1] = "ACTIVE";
    PRODUCT_STATUS[PRODUCT_STATUS["INACTIVE"] = 0] = "INACTIVE";
})(PRODUCT_STATUS || (exports.PRODUCT_STATUS = PRODUCT_STATUS = {}));
exports.PERMISSION_KEY = 'permissions';
var Pagination_Length;
(function (Pagination_Length) {
    Pagination_Length[Pagination_Length["START"] = 1] = "START";
    Pagination_Length[Pagination_Length["VERY_SMALL"] = 2] = "VERY_SMALL";
    Pagination_Length[Pagination_Length["SMALL"] = 5] = "SMALL";
    Pagination_Length[Pagination_Length["MEDIUM"] = 10] = "MEDIUM";
    Pagination_Length[Pagination_Length["LARGE"] = 20] = "LARGE";
})(Pagination_Length || (exports.Pagination_Length = Pagination_Length = {}));
exports.MAX_PROFILE_PICTURE_SIZE_IN_BYTES = 5 * 1024 * 1024;
//# sourceMappingURL=constants.js.map