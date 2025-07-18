import { Request } from 'express';
import { AuthenticatedUser } from 'src/common';
export interface RequestWithUser extends Request {
    user?: AuthenticatedUser;
}
