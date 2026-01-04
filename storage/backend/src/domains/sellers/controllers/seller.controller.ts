import { Body, Controller, Get, HttpStatus, Param, Post } from "@nestjs/common";
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
import { SellerCreateRequest } from "../dtos/request";
import { SellerResponse } from "../dtos/response";
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

  @Get(":id")
  @ApiResponse({ status: HttpStatus.OK, type: SellerResponse })
  @ApiNotFoundResponse()
  async getOne(@Param() params: ResourceParams) {
    const res = await this.queryBus.execute(new SellerGetOneQuery(params.id));
    return res;
  }
}
