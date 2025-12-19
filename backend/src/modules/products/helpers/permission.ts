import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../../users/schemas/user.schema';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductPermission {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async canUploadProduct(userId: string): Promise<boolean> {
    const user = await this.userModel.findById(userId).select('role');
    return user?.role === 'ADMIN';
  }
}