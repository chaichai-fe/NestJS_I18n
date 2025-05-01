import { IsString, IsNotEmpty } from 'class-validator';

class CreateLangTagDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}

export default CreateLangTagDto;
