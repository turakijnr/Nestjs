import {Body, Controller, Post, ValidationPipe} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {AuthCredentialsDto} from "./dto/auth-credentials.dto";

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
    async signIn(@Body(ValidationPipe) authcredentialsDto: AuthCredentialsDto): Promise<void>{
        return this.authService.signIn(authcredentialsDto)
    }
}