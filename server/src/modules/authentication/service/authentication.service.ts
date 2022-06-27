import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import CreateUserDto from '../../../modules/user/dto/create-user.dto';

// import { DictionaryModel } from '../model/dictionary.model';
import TokenData from '../../../interfaces/token-data.interface';
import LogInDto from '../dto/log-in.dto';
import DataStoredInToken from '../../../interfaces/data-stored-in-token.interface';
import userModel, { User } from '../../user/model/user.model';

export class AuthenticationService {

   

    async register ({name, email, password}: CreateUserDto){

        const existedUser = await userModel.findOne({ email })

        // Check for existence.
        if(existedUser) {
            return null;
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await userModel.create({
            email,
            name,
            password: hashedPassword,
        });
        newUser.password = null;
        const tokenData = this.createToken(newUser);
        const cookie = this.createCookie(tokenData)

        return [newUser, cookie];
    }

    async login ({email, password}: LogInDto){

        const user = await userModel.findOne({ email })

        // Check for existence.
        if(!user) {
            return null;
        }

        const isPasswordMatching = await bcrypt.compare(password, user.password);
        if (!isPasswordMatching) {
            return null;
        }

        user.password = null;
        const tokenData = this.createToken(user);
        const cookie = this.createCookie(tokenData)

        return [user, cookie, tokenData.token];

    }

    async me (user){

    }

    private createCookie(tokenData: TokenData) {
        return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}`;
    }
    
    private createToken(user: User): TokenData {
        const expiresIn = 60 * 60; // an hour
        // const secret = process.env.JWT_SECRET;
        const secret = "process.env.JWT_SECRET";
        const dataStoredInToken: DataStoredInToken = {
          _id: user._id,
        };
        return {
          expiresIn,
          token: jwt.sign(dataStoredInToken, secret, { expiresIn }),
        };
      }

}

export default new AuthenticationService();