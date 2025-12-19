import { Controller, Get, UseGuards, Patch, Req, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../common/guards';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from "../common/decorators/roles.decorator";
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Get()
  async getAllUsers() {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Patch('update')
  async updateUser(@Req() req, @Body() body: UpdateUserDto) {
    return this.usersService.updateUser(req.user._id, body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('details')
  async getUserDetails(@Req() req) {
    return this.usersService.getUserDetails(req.user._id);
  }
}