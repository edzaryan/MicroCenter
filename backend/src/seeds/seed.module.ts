import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { MongooseModule } from '@nestjs/mongoose';
// import { User, UserSchema } from '../modules/users/schemas/user.schema';

@Module({
    imports: [
        // MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ],
    providers: [SeedService],
})
export class SeedModule {}