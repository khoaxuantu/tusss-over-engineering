import { Body, Controller, Get, HttpStatus, Param, Post, Query } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { ApiResponse } from "@nestjs/swagger";
import { CommonMessage } from "@tusss/core";
import {
  ApiAuthRequired,
  ApiConflictResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ResourceCreateResponse,
  ResourceParams,
} from "@tusss/nestjs";
import { StoreCreateCommand } from "../commands/create.command";
import { StoreCreateRequest, StoreFilterRequest } from "../dtos/request";
import { StoreFilterResponse, StoreResponse } from "../dtos/response";
import { StoreFilterQuery } from "../queries/filter.query";
import { StoreGetOneQuery } from "../queries/get-one.query";

@Controller("stores")
@ApiAuthRequired()
export class StoreController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @ApiResponse({ type: ResourceCreateResponse, status: HttpStatus.CREATED })
  @ApiConflictResponse()
  @ApiInternalServerErrorResponse({}, { messages: [CommonMessage.error.create] })
  async create(@Body() body: StoreCreateRequest): Promise<ResourceCreateResponse> {
    const res = await this.commandBus.execute(new StoreCreateCommand(body));
    return res;
  }

  @Get()
  @ApiResponse({ status: HttpStatus.OK, type: StoreFilterResponse })
  async filter(@Query() q: StoreFilterRequest) {
    const res = await this.queryBus.execute(new StoreFilterQuery(q));
    return res;
  }

  @Get(":id")
  @ApiResponse({ status: HttpStatus.OK, type: StoreResponse })
  @ApiNotFoundResponse()
  async getOne(@Param() params: ResourceParams) {
    const res = await this.queryBus.execute(new StoreGetOneQuery(params.id));
    return res;
  }
}
