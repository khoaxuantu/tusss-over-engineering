import { DataValue } from "./interface";

export interface DataNumberProps extends DataValue {}

const formatter = new Intl.NumberFormat("vi");

export default function DataNumber({ value }: DataNumberProps) {
  if (value === null) return <>Null</>;

  const num = Number(value);

  let str: string;
  if (isNaN(num)) str = "N/A";
  else str = formatter.format(num);

  return <>{str}</>;
}
