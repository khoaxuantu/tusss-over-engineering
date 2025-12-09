import { ApiQuery } from "@nestjs/swagger";
import { ClassConstructor } from "@tusss/core";

interface ApiQueryObjOpts<T> {
  name: string;
  cls: ClassConstructor<T>;
  examples?: Record<string, { value: Record<string, any> }>;
}

export const ApiQueryObject = <T>(opts: ApiQueryObjOpts<T>) => {
  return ApiQuery({
    name: opts.name,
    style: "deepObject",
    explode: true,
    type: opts.cls,
    examples: opts.examples,
  });
};
