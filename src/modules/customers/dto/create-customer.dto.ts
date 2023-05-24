import { hashSync } from "bcryptjs";
import { Transform } from "class-transformer";
import { IsString, IsNotEmpty, IsEmail, MinLength } from "class-validator";
import { group } from "console";

export class CreateCustomerDto {
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @Transform(({ value }: { value: string }) => hashSync(value, 10), { groups: ["transform"] })
  password: string;

  @IsString()
  @IsNotEmpty()
  phoneNumber: string;
}
