import { Body, Controller, Get, HttpStatus, Param, Post, Query } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { CommonMessage } from "@tusss/core";
import {
  ApiAuthRequired,
  ApiCommonResponse,
  ApiConflictResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiQueryObject,
  ApiSortsRequest,
} from "@tusss/nestjs/swagger";
import { DistrictCreateCommand } from "./commands/create.command";
import { DistrictCreateRequest, DistrictFilterField, DistrictFilterRequest } from "./dtos/request";
import { DistrictFilterResponse, DistrictResponse } from "./dtos/response";
import { DistrictFilterQuery } from "./queries/filter.query";
import { DistrictGetOneQuery } from "./queries/get-one.query";

@Controller("districts")
@ApiTags("Districts")
@ApiAuthRequired()
export class DistrictController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @ApiCommonResponse({ status: HttpStatus.CREATED, messages: [CommonMessage.ok.create] })
  @ApiConflictResponse({}, { messages: [CommonMessage.error.duplicated, CommonMessage.error.db] })
  @ApiInternalServerErrorResponse({}, { messages: [CommonMessage.error.create] })
  async create(@Body() body: DistrictCreateRequest) {
    const res = await this.commandBus.execute(new DistrictCreateCommand(body));
    return res;
  }

  @Get(":id")
  @ApiResponse({ type: DistrictResponse, status: HttpStatus.OK })
  @ApiNotFoundResponse()
  async getOne(@Param("id") id: string) {
    const res = await this.queryBus.execute(new DistrictGetOneQuery(id));
    return res;
  }

  @Get()
  @ApiQueryObject({
    name: "and",
    cls: DistrictFilterField,
    examples: {
      blank: { value: {} },
      by_id: { value: { "0][id][contain": "tayho" } },
      by_name: { value: { "0][name][contain": "Tây Hồ" } },
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
  @ApiResponse({ type: DistrictFilterResponse, status: HttpStatus.OK })
  async filter(@Query() query: DistrictFilterRequest) {
    const res = await this.queryBus.execute(new DistrictFilterQuery(query));
    return res;
  }
}
