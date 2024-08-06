import { ApiProperty } from '@nestjs/swagger';

export class TokenDTO {
  @ApiProperty()
  access_token: string;
  @ApiProperty()
  expireIn: number;
  @ApiProperty()
  userId: number;
}

export class SaveTokenDTO {
  userId?: number;
  token?: string | null;
}
export class GenereteTokenDTO {
  sub: number;
  username: string;
  name: string;
}
