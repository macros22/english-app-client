import { IsMongoId, IsOptional } from 'class-validator';
import { WordStudyStatus } from '../../../types/types';
import { IsStudyStatus } from '../../../utils/study-status.validator';

import AddWordDto from '../../common-dictionary/dto/add-word.dto';

class AddWordToUserDto extends AddWordDto {
  
  @IsMongoId()
  @IsOptional()
  public wordInCommonDictionaryId: string;


  @IsStudyStatus({
    message: "Incorrect word study status."
  })
  public studyStatus: WordStudyStatus;
}
 
export default AddWordToUserDto;