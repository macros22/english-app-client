import { ArrayMinSize, IsArray, IsMongoId, IsOptional, IsString } from 'class-validator';
import { WordStudyStatus } from '../../../types/types';
import { IsStudyStatus } from '../../../utils/study-status.validator';
import { UsageExample } from '../../../modules/common-dictionary/model/common-dictionary.model';
 
class ModifyUserWordDto {
  
  @IsOptional()
  @IsString()
  public word: string;
 
  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  public translation: string[];

  @IsOptional()
  public transcription: string;

  @IsOptional()
  public usageExamples: UsageExample[];


  @IsOptional()
  @IsMongoId()
  public wordInCommonDictionaryId: string;

  @IsOptional()
  @IsStudyStatus({
    message: "Incorrect word study status."
  })
  public studyStatus: WordStudyStatus;
}
 
export default ModifyUserWordDto;