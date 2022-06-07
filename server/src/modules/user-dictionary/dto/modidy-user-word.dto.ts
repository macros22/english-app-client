import { IsString } from 'class-validator';
import AddWordToUserDto from './add-word-to-user.dto';
 
class ModifyUserWordDto extends AddWordToUserDto{
  // @IsString()
  // public status: string;
}
 
export default ModifyUserWordDto;