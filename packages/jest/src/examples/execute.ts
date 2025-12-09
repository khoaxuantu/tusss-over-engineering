export function testExecution(name: string, doTest: () => any) {
  describe(name, () => {
    test("execute", async () => {
      await doTest();
    });
  });
}
