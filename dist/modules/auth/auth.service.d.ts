import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { LoginDTO } from './dto/login.dto';
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    validateUser(email: string, password: string): Promise<{
        id: number;
        email: string;
        name: string;
        role: {
            name: string;
            permissions: string[];
        };
    }>;
    login(body: LoginDTO): Promise<string>;
}
