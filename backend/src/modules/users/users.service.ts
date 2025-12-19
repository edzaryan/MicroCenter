import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";
import { User } from "./schemas/user.schema";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async findAll() {
    const users = await this.userModel.find().exec();

    return {
      message: 'All Users',
      data: users,
      success: true,
      error: false,
    };
  }

  async updateUser(userId: string, updateData: any) {
    const { email, name, role } = updateData;

    const user = await this.userModel.findById(userId);
      
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const payload: any = {};
    if (email) payload.email = email;
    if (name) payload.name = name;
    if (role) payload.role = role;

    const updatedUser = await this.userModel.findByIdAndUpdate(
      userId,
      payload,
      { new: true },
    );

    return {
      data: updatedUser,
      message: 'User updated successfully',
      success: true,
      error: false,
    };
  }

  async getUserDetails(userId: string) {
    const user = await this.userModel.findById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      data: user,
      error: false,
      success: true,
      message: 'User details',
    };
  }

  async findByEmail(email: string) {
    return this.userModel.findOne({ email });
  }

  async createUser(data: { email: string; password: string; role?: string }) {
    const user = new this.userModel(data);
    return user.save();
  }
}
