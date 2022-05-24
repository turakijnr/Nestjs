import {Body, Controller, createParamDecorator, Post, Req, UseGuards, ValidationPipe} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {AuthCredentialsDto} from "./dto/auth-credentials.dto";

import {AuthGuard} from "@nestjs/passport";
import {GetUser} from "./get-user.decorator";
import {User} from "./user.entity";


@Controller('auth')
export class AuthController {
    constructor(
        private authService : AuthService
    ) {}
    @Post('/signup')
    async signUp(@Body(ValidationPipe) authcredentialsDto: AuthCredentialsDto): Promise<void>{
        return this.authService.signUp(authcredentialsDto)
    }
    @Post('/signin')
    async signIn(@Body(ValidationPipe) authcredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }>{
        return this.authService.signIn(authcredentialsDto)
    }
    @Post('/test')
    @UseGuards(AuthGuard())
    test(@GetUser() user :User){
        console.log(user)
    }


}
