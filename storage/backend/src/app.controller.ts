import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";
import { ApiAuthRequired } from "./shared/decorators/swagger/api-auth-required.decorator";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiAuthRequired()
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
