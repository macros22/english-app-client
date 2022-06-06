import { IsOptional, IsString } from 'class-validator';

import AddWordDto from '../../dictionary/dto/add-word.dto';

import { IsMongoObjectId } from '../../../utils/mongo-object-id-validator';
class AddWordToUserDto extends AddWordDto {
  // @IsString()
  @IsOptional()
  @IsMongoObjectId({
    message: 'Not valid mongo Object Id',
  })
  public wordFromCommonDictionaryId: string;
}
 
export default AddWordToUserDto;