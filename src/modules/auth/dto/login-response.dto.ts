import { ApiProperty } from '@nestjs/swagger';

export class LoginResponseDTO {
    @ApiProperty()
    token: string;
}
