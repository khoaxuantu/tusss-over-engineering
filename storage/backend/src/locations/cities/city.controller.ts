import { ApiAuthRequired } from "@/shared/decorators/swagger/api-auth-required.decorator";
import { ApiInternalServerErrorResponse } from "@/shared/decorators/swagger/api-internal-error.decorator";
import { ApiNotFoundResponse } from "@/shared/decorators/swagger/api-not-found.decorator";
import { ApiQueryObject } from "@/shared/decorators/swagger/api-query-object.decorator";
import { ApiSortsRequest } from "@/shared/decorators/swagger/api-sort-request.decorator";
import { Body, Controller, Get, HttpStatus, Param, Post, Query } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { CommonMessage } from "@tusss/core";
import { ApiConflictResponse } from "@tusss/nestjs";
import { CityCreateCommand } from "./commands/create.command";
import { CityCreateRequest, CityFilterField, CityFilterRequest } from "./dtos/request";
import { CityCreateResponse, CityFilterResponse, CityResponse } from "./dtos/response";
import { CityFilterQuery } from "./queries/filter.query";
import { CityGetOneQuery } from "./queries/get-one.query";

@Controller("cities")
@ApiTags("City")
@ApiAuthRequired()
export class CityController {
  constructor(
    private commandBus: CommandBus,
    private queryBus: QueryBus,
  ) {}

  @Post()
  @ApiResponse({ type: CityCreateResponse, status: HttpStatus.CREATED })
  @ApiConflictResponse({}, { messages: [CommonMessage.error.duplicated, CommonMessage.error.db] })
  @ApiInternalServerErrorResponse({}, { messages: [CommonMessage.error.create] })
  async create(@Body() body: CityCreateRequest) {
    const newId = await this.commandBus.execute(new CityCreateCommand(body));
    return new CityCreateResponse({ new_id: newId });
  }

  @Get(":id")
  @ApiResponse({ type: CityResponse, status: HttpStatus.OK })
  @ApiNotFoundResponse()
  async getOne(@Param("id") id: string) {
    const city = await this.queryBus.execute(new CityGetOneQuery(id));
    return city;
  }

  @Get()
  @ApiQueryObject({
    name: "and",
    cls: CityFilterField,
    examples: {
      blank: { value: {} },
      by_id: { value: { "0][id][contain": "hanoi" } },
      by_name: { value: { "0][name][contain": "Hà Nội" } },
    },
  })
  @ApiSortsRequest({
    fields: ["name"],
    examples: {
      blank: { value: {} },
      by_name_asc: { value: { "0][field": "name", "0][direction": "asc" } },
      by_name_desc: { value: { "0][field": "name", "0][direction": "desc" } },
    },
  })
  @ApiResponse({ type: CityFilterResponse, status: HttpStatus.OK })
  async filter(@Query() query: CityFilterRequest) {
    const res = await this.queryBus.execute(new CityFilterQuery(query));
    return res;
  }
}
