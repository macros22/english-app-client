import { IsString, IsArray, ArrayMinSize } from 'class-validator';
 
class CreateWordDto {
  @IsString()
  public eng: string;
 
  @IsArray()
  @ArrayMinSize(1)
  public rus: string[];
 
}
 
export default CreateWordDto;