import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log('holaaaaaaa')
    const result = (await super.canActivate(context)) as boolean
    if (!result) {
      throw new UnauthorizedException('Invalid Credentials')
    }
    return result
  }
}
