import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class AddressMainDTO {
  @AutoMap()
  @ApiProperty()
  public id: number;
  @AutoMap()
  @ApiProperty()
  public street: string;
  @AutoMap()
  @ApiProperty()
  public city: string;
  @AutoMap()
  @ApiProperty()
  public pincode: string;
}
