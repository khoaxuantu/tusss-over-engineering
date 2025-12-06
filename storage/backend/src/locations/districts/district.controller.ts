import { CommonMessage } from "@/shared/constants";
import { ApiAuthRequired } from "@/shared/decorators/swagger/api-auth-required.decorator";
import { ApiCommonResponse } from "@/shared/decorators/swagger/api-common-response.decorator";
import { ApiConflictResponse } from "@/shared/decorators/swagger/api-conflict-error.decorator";
import { ApiInternalServerErrorResponse } from "@/shared/decorators/swagger/api-internal-error.decorator";
import { ApiNotFoundResponse } from "@/shared/decorators/swagger/api-not-found.decorator";
import { ApiQueryObject } from "@/shared/decorators/swagger/api-query-object.decorator";
import { CommonResponse } from "@/shared/dtos/response";
import { Controller, Get, HttpStatus, Post } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { DistrictFilterField } from "./dtos/request";
import { DistrictFilterResponse, DistrictResponse } from "./dtos/response";

@Controller("districts")
@ApiTags("Districts")
@ApiAuthRequired()
export class DistrictController {
  @Post()
  @ApiCommonResponse({ status: HttpStatus.CREATED, messages: [CommonMessage.ok.create] })
  @ApiConflictResponse({}, { messages: [CommonMessage.error.duplicated, CommonMessage.error.db] })
  @ApiInternalServerErrorResponse({}, { messages: [CommonMessage.error.create] })
  create() {
    return new CommonResponse({ message: CommonMessage.ok.create });
  }

  @Get(":id")
  @ApiResponse({ type: DistrictResponse, status: HttpStatus.OK })
  @ApiNotFoundResponse()
  async getOne() {}

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
  async filter() {}
}
