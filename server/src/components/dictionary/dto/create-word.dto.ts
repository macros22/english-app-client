import { IsString, IsArray, ArrayMinSize, IsOptional } from 'class-validator';
import { UsageExample } from '../model/dictionary.model';
 
class CreateWordDto {
  @IsString()
  public eng: string;
 
  @IsArray()
  @ArrayMinSize(1)
  public rus: string[];

  @IsOptional()
  public transcription: string;

  @IsOptional()
  public usageExamples: UsageExample[];
 
}
 
export default CreateWordDto;