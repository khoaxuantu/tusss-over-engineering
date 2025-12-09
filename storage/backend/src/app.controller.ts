import { Controller, Get } from "@nestjs/common";
import { ApiAuthRequired } from "@tusss/nestjs";
import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiAuthRequired()
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
