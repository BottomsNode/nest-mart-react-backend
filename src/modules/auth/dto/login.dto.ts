import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class LoginDTO {
  @ApiProperty({
    example: 'admin@admin.com',
    description: 'The email address of the user',
  })
  @IsEmail({}, { message: 'Please enter a valid email address' })
  @AutoMap()
  email: string;

  @ApiProperty({
    example: 'Admin@1234',
    description: 'The password of the user (min 6 characters)',
  })
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  @AutoMap()
  password: string;
}
