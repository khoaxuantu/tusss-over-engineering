import { ApiProperty } from "@nestjs/swagger";

export class ResourceCreateResponse {
  @ApiProperty({
    description: "The object representative of a created resource id",
    type: "object",
    properties: {
      as_str: { type: "string", example: "1" },
      as_num: { type: "number", example: 1 },
    },
    required: ["as_str", "as_num"],
    selfRequired: true,
  })
  new_id: { as_str: string; as_num: number };

  constructor(newIdStr: string, newIdNum: number) {
    this.new_id = { as_str: newIdStr, as_num: newIdNum };
  }
}
