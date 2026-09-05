import { ScanEngine } from "../engine";

describe(ScanEngine, () => {
  describe("newResult", () => {
    const engine = new ScanEngine<number>({ direction: "asc", getLastCursor: (v) => v, limit: 10 });

    it("should create result with lastCursor when docs length equal to limit", () => {
      const docs = Array.from({ length: 10 }).map((_, i) => i);
      const result = engine.newResult(docs);
      expect(result.lastCursor).toBe(9);
    });

    it("should create result without lastCursor when docs length less than limit", () => {
      const docs = Array.from({ length: 9 }).map((_, i) => i);
      const result = engine.newResult(docs);
      expect(result.lastCursor).toBeUndefined();
    });
  });
});
