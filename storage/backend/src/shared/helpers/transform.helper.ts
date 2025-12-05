import { ClassConstructor, plainToInstance } from "class-transformer";

export type ParamClsConstructor = ClassConstructor<any> | StringConstructor | NumberConstructor;
type Transformed<T> = T extends StringConstructor
  ? string
  : T extends NumberConstructor
    ? number
    : T extends ClassConstructor<object>
      ? InstanceType<T>
      : never;

export interface TransformArrParamsProps<T extends ParamClsConstructor> {
  cls: T;
  value: NonNullable<string | object | (string | object)[]>;
}

export function transformArrParams<T extends ParamClsConstructor>(
  props: TransformArrParamsProps<T>,
): Transformed<T>[] {
  const inputs = Array.isArray(props.value) ? props.value : [props.value];

  return inputs.map((input) => {
    if (props.cls === String || props.cls === Number) {
      return (props.cls as unknown as (v: string | number) => string | number)(input);
    }

    return plainToInstance(props.cls as ClassConstructor<object>, input);
  }) as Transformed<T>[];
}
