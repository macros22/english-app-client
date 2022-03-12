import { Request } from 'express';
import { User } from '../modules/user/model/user.model';

 
interface RequestWithUser extends Request {
  user: User;
}
 
export default RequestWithUser;