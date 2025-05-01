import { TranslationContent } from '../../db/schema';
import { IsNotEmpty } from 'class-validator';
class CreateTranslationDto {
  @IsNotEmpty()
  business_tag_id: number;

  @IsNotEmpty()
  translations: TranslationContent;
}

export default CreateTranslationDto;
