import { ApiProperty, OmitType } from '@nestjs/swagger';

export class CreateUserDTO {
  @ApiProperty()
  name: string;
  @ApiProperty()
  documentNumber: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
}
export class UserUpdateDTO extends OmitType(CreateUserDTO, [
  'password',
] as const) {}

export class UserResponseDTO {
  name: string;
  documentNumber: string;
  email: string;
  createdAt: Date;
  active: boolean;
}
