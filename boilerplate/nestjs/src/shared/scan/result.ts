export class ScanResult<TRecord, TCursor> {
  constructor(
    readonly items: TRecord[],
    readonly lastCursor?: TCursor,
  ) {}
}
