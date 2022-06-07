import { IsOptional, IsString } from 'class-validator';

import AddWordDto from '../../common-dictionary/dto/add-word.dto';

import { IsMongoObjectId } from '../../../utils/mongo-object-id-validator';
class AddWordToUserDto extends AddWordDto {
  // @IsString()
 
  @IsMongoObjectId({
    message: 'Not valid mongo Object Id',
  })
  @IsOptional()
  public wordInCommonDictionaryId: string;
}
 
export default AddWordToUserDto;