import { CommonMessage } from "@/shared/constants";
import { ApiAuthRequired } from "@/shared/decorators/swagger/api-auth-required.decorator";
import { ApiConflictResponse } from "@/shared/decorators/swagger/api-conflict-error.decorator";
import { ApiInternalServerErrorResponse } from "@/shared/decorators/swagger/api-internal-error.decorator";
import { ApiNotFoundResponse } from "@/shared/decorators/swagger/api-not-found.decorator";
import { Body, Controller, Get, HttpStatus, Param, Post } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { CityCreateCommand } from "./commands/create.command";
import { CityCreateRequest } from "./dtos/request";
import { CityCreateResponse, CityResponse } from "./dtos/response";
import { CityGetOneQuery } from "./queries/get-one.query";

@Controller("cities")
@ApiTags("City")
export class CityController {
  constructor(
    private commandBus: CommandBus,
    private queryBus: QueryBus,
  ) {}

  @Post()
  @ApiAuthRequired()
  @ApiResponse({ type: CityCreateResponse, status: HttpStatus.CREATED })
  @ApiConflictResponse({}, { messages: [CommonMessage.error.duplicated, CommonMessage.error.db] })
  @ApiInternalServerErrorResponse({}, { messages: [CommonMessage.error.create] })
  async create(@Body() body: CityCreateRequest) {
    const newId = await this.commandBus.execute(new CityCreateCommand(body));
    return new CityCreateResponse({ new_id: newId });
  }

  @Get(":id")
  @ApiAuthRequired()
  @ApiResponse({ type: CityResponse, status: HttpStatus.OK })
  @ApiNotFoundResponse()
  async getOne(@Param("id") id: string) {
    const city = await this.queryBus.execute(new CityGetOneQuery(id));
    return city;
  }
}
