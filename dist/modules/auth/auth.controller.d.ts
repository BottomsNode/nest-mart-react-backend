import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(body: LoginDTO): Promise<string>;
}
