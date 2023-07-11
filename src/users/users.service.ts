import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './users.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findOrCreate(user: Partial<UserDocument>): Promise<UserDocument> {
    const userRecord = await this.userModel.findOne({
      googleId: user.googleId,
    });
    if (userRecord) {
      return userRecord;
    } else {
      return this.userModel.create(user);
    }
  }
}
