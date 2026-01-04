import { Body, Controller, HttpStatus, Post } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { ApiResponse } from "@nestjs/swagger";
import { ApiAuthRequired, ApiConflictResponse, ResourceCreateResponse } from "@tusss/nestjs";
import { SellerCreateCommand } from "../commands/create.command";
import { SellerCreateRequest } from "../dtos/request";

@Controller("sellers")
@ApiAuthRequired()
export class SellerController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  @ApiResponse({ type: ResourceCreateResponse, status: HttpStatus.CREATED })
  @ApiConflictResponse()
  async create(@Body() body: SellerCreateRequest): Promise<ResourceCreateResponse> {
    const res = await this.commandBus.execute(new SellerCreateCommand(body));
    return res;
  }
}
