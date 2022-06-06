import { IsOptional, IsString } from 'class-validator';

import AddWordDto from '../../dictionary/dto/add-word.dto';

class AddWordToUserDto extends AddWordDto {
  @IsString()
  @IsOptional()
  public wordFromCommonDictionaryId: string;
}
 
export default AddWordToUserDto;