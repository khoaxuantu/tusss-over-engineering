import { hookContext, JestHooks } from "../contexts/hook";

interface TestSuccessProps {
  hooks?: JestHooks;
  subject: () => Promise<any>;
  expectMore?: (mocks?: Record<string, jest.SpyInstance>) => Promise<void> | void;
  expectResult?: () => any;
  spy?: () => Record<string, jest.SpyInstance>;
}

export function testSuccess({ hooks, subject, expectMore, spy, expectResult }: TestSuccessProps) {
  describe("when qualify all conditions", () => {
    hookContext(hooks);

    it("should be success", async () => {
      const mocks = spy?.();
      if (expectResult) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const res = await subject();
        expect(res).toEqual(expectResult());
      } else {
        await expect(subject()).resolves.not.toThrow();
      }
      if (expectMore) await expectMore(mocks);
      jest.clearAllMocks();
    });
  });
}

export function testNoThrow({ subject, hooks }: Pick<TestSuccessProps, "subject" | "hooks">) {
  describe("when there is an internal error", () => {
    hookContext(hooks);

    it("should not throw", async () => {
      await expect(subject()).resolves.not.toThrow();
    });
  });
}
