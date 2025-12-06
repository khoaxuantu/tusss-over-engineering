import {
  ParamClsConstructor,
  transformArrParams,
  TransformArrParamsProps,
} from "@/shared/helpers/transform.helper";
import { Transform } from "class-transformer";

export function TransformArrParams<T extends ParamClsConstructor>(
  cls: TransformArrParamsProps<T>["cls"],
) {
  return Transform(({ value }) =>
    transformArrParams({ cls, value: value as string | object | (string | object)[] }),
  );
}
