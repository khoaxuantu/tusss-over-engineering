import { ScanResult } from "./result";

export type ScanDirection = "asc" | "desc";
export type ScanOperator = "<" | ">";

interface ScanEngineProps<TRecord, TCursor> {
  limit: number;
  direction: ScanDirection;

  getLastCursor: (doc: TRecord) => TCursor;
}

class OperatorMap extends Map<ScanDirection, ScanOperator> {
  override get(key: ScanDirection): ScanOperator {
    const operator = super.get(key);
    return operator || "<";
  }
}

const operatorMap = new OperatorMap([
  ["asc", ">"],
  ["desc", "<"],
]);

export class ScanEngine<TRecord, TCursor = number> {
  /**
   * @default 1
   */
  private readonly limit: number;
  private readonly getLastCursor: (doc: TRecord) => TCursor;

  constructor(props: ScanEngineProps<TRecord, TCursor>) {
    this.limit = Math.max(props.limit, 1);
    this.getLastCursor = props.getLastCursor;
  }

  get operatorMap() {
    return operatorMap;
  }

  newResult(docs: TRecord[]): ScanResult<TRecord, TCursor | undefined> {
    if (docs.length < this.limit) return new ScanResult<TRecord, undefined>(docs);

    const lastCursor = this.getLastCursor(docs[docs.length - 1]);

    return new ScanResult(docs, lastCursor);
  }
}
