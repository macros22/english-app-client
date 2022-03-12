import { IsString } from 'class-validator';
 
class ModifyUserWordDto {
  @IsString()
  public status: string;
}
 
export default ModifyUserWordDto;