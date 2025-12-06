import { CommonMessage } from "@/shared/constants";
import { ApiAuthRequired } from "@/shared/decorators/swagger/api-auth-required.decorator";
import { ApiCommonResponse } from "@/shared/decorators/swagger/api-common-response.decorator";
import { ApiConflictResponse } from "@/shared/decorators/swagger/api-conflict-error.decorator";
import { ApiInternalServerErrorResponse } from "@/shared/decorators/swagger/api-internal-error.decorator";
import { ApiNotFoundResponse } from "@/shared/decorators/swagger/api-not-found.decorator";
import { ApiQueryObject } from "@/shared/decorators/swagger/api-query-object.decorator";
import { Body, Controller, Get, HttpStatus, Param, Post, Query } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
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
  @ApiResponse({ type: DistrictFilterResponse, status: HttpStatus.OK })
  async filter(@Query() query: DistrictFilterRequest) {
    const res = await this.queryBus.execute(new DistrictFilterQuery(query));
    return res;
  }
}
