import {
  Body,
  Controller,
  Get,
  Headers,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { IncomingHttpHeaders } from 'http';
import { RawHeaders } from 'src/common/decorators/raw-headers.decorator';
import { AuthService } from './auth.service';
import { Auth, GetUser, RoleProtected } from './decorators';
import { CreateUserDto, LoginUserDto } from './dto';
import { User } from './entities/user.entity';
import { UserRoleGuard } from './guards/user-role/user-role.guard';
import { ValidRoles } from './interfaces';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiResponse({
    status: 201,
    description: 'User register successfully',
  })
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  @ApiResponse({
    status: 200,
    description: 'User login',
  })
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('check-auth-status')
  @ApiResponse({
    status: 200,
    description: 'Check auth status',
    headers: {
      authorization: {
        description: 'Bearer token',
        schema: {
          type: 'string',
          example: 'Bearer eyafsasfasdasa',
        },
      },
    },
  })
  @Auth()
  checkAuthStatus(@GetUser() user: User) {
    return this.authService.checkAuthStatus(user);
  }

  @Get('private')
  @UseGuards(AuthGuard())
  // testingPrivateRoute(@GetUser(['email', 'role', 'fullName']) user: User) {
  testingPrivateRoute(
    @Req() req: Express.Request,
    @GetUser() user: User,
    @GetUser('email') userEmail: string,
    @RawHeaders() rawHeaders: string[], // Custom decorator
    @Headers() headers: IncomingHttpHeaders,
  ) {
    return {
      ok: true,
      message: 'This is a private route',
      user,
      userEmail,
      rawHeaders,
      headers,
    };
  }

  // @Get('private2')
  // @SetMetadata('roles', ['admin', 'super-user'])
  // @UseGuards(AuthGuard(), UserRoleGuard) // no se crean instancias de los guards personalizados
  // testingPrivateRoute2(@GetUser() user: User) {
  //   return {
  //     ok: true,
  //     message: 'This is a private route',
  //     user,
  //   };
  // }
  @Get('private2')
  @RoleProtected(ValidRoles.superUser, ValidRoles.admin)
  @UseGuards(AuthGuard(), UserRoleGuard) // no se crean instancias de los guards personalizados
  testingPrivateRoute2(@GetUser() user: User) {
    return {
      ok: true,
      message: 'This is a private route',
      user,
    };
  }
  @Get('private3')
  @Auth(ValidRoles.admin)
  testingPrivateRoute3(@GetUser() user: User) {
    return {
      ok: true,
      message: 'This is a private route',
      user,
    };
  }
}
