import { Strategy } from 'passport-jwt';
import { JwtPayload } from 'src/common';
declare const JwtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtStrategy extends JwtStrategy_base {
    constructor();
    validate(payload: JwtPayload): {
        userId: string | number;
        email: string;
        role: string;
        permission: import("../entities/role.entity").RolesEntity;
    };
}
export {};
