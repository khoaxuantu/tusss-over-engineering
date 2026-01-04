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
import { SellerCreateCommand } from "../commands/create.command";
import { SellerCreateRequest, SellerFilterRequest } from "../dtos/request";
import { SellerFilterResponse, SellerResponse } from "../dtos/response";
import { SellerFilterQuery } from "../queries/filter.query";
import { SellerGetOneQuery } from "../queries/get-one.query";

@Controller("sellers")
@ApiAuthRequired()
export class SellerController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @ApiResponse({ type: ResourceCreateResponse, status: HttpStatus.CREATED })
  @ApiConflictResponse()
  @ApiInternalServerErrorResponse({}, { messages: [CommonMessage.error.create] })
  async create(@Body() body: SellerCreateRequest): Promise<ResourceCreateResponse> {
    const res = await this.commandBus.execute(new SellerCreateCommand(body));
    return res;
  }

  @Get()
  @ApiResponse({ status: HttpStatus.OK, type: SellerFilterResponse })
  async filter(@Query() q: SellerFilterRequest) {
    const res = await this.queryBus.execute(new SellerFilterQuery(q));
    return res;
  }

  @Get(":id")
  @ApiResponse({ status: HttpStatus.OK, type: SellerResponse })
  @ApiNotFoundResponse()
  async getOne(@Param() params: ResourceParams) {
    const res = await this.queryBus.execute(new SellerGetOneQuery(params.id));
    return res;
  }
}
