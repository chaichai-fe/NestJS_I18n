import { IsString, IsNotEmpty } from 'class-validator';

class CreateBusinessTagDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}

export default CreateBusinessTagDto;
