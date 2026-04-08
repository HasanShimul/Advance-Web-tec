import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class JwtRoleGuard implements CanActivate {
    constructor(
        private jwtService: JwtService
    ) { }
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        // console.log("Request: " ,request);
        const authHeader = request.headers.authorization;
        // console.log("authHeader: " ,authHeader);


        const token = authHeader?.split(' ')[1];
        console.log("Token: ", token);

        if (!token) {
            throw new UnauthorizedException('No token is provided.');
        }
        try {
            const payload = await this.jwtService.verify(token);
            console.log("payload: ", payload);

            request.user = payload;
        }
        catch (error) {
            //console.log("Error: ",error.message);
            throw new UnauthorizedException('Token is  expired or invalid. Please login again');

        }
        return true;
    }
}