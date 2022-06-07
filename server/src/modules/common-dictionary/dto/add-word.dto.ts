import { IsString, IsArray, ArrayMinSize, IsOptional } from 'class-validator';
import { UsageExample } from '../model/common-dictionary.model';
 
class AddWordDto {
  @IsString()
  public word: string;
 
  @IsArray()
  @ArrayMinSize(1)
  public translation: string[];

  @IsOptional()
  public transcription: string;

  @IsOptional()
  public usageExamples: UsageExample[];
 
}
 
export default AddWordDto;