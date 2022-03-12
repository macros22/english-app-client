import { IsString } from 'class-validator';
 
class AddWordToUserDto {
  @IsString()
  public wordId: string;
}
 
export default AddWordToUserDto;