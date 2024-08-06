import { ApiProperty } from '@nestjs/swagger';

export class RefreshToken {
  @ApiProperty()
  oldToken: string;
}
