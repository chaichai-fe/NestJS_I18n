import { TranslationContent } from '../../db/schema'
import { IsNotEmpty, IsString, IsNumber, IsObject } from 'class-validator'

class CreateTranslationDto {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsString()
  description: string

  @IsNotEmpty()
  @IsNumber()
  business_tag_id: number

  @IsNotEmpty()
  @IsObject()
  translations: TranslationContent
}

export default CreateTranslationDto
