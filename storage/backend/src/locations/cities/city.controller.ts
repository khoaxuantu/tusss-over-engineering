import { ApiAuthRequired } from "@/shared/decorators/swagger/api-auth-required.decorator";
import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CityCreateRequest } from "./dtos/request";

@Controller("cities")
@ApiTags("City")
export class CityController {
  constructor() {}

  @Post()
  @ApiAuthRequired()
  async create(@Body() body: CityCreateRequest) {
    throw new Error("Test");
  }
}
