import { IsMongoId, IsOptional} from 'class-validator';

import AddWordDto from '../../common-dictionary/dto/add-word.dto';

class AddWordToUserDto extends AddWordDto {
  
  @IsMongoId()
  @IsOptional()
  public wordInCommonDictionaryId: string;
}
 
export default AddWordToUserDto;