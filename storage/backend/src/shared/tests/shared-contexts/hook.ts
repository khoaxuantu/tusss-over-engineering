export interface JestHooks {
  beforeEach?: () => Promise<void> | void;
  afterEach?: () => Promise<void> | void;
  beforeAll?: () => Promise<void> | void;
  afterAll?: () => Promise<void> | void;
}

export function hookContext(hooks?: JestHooks) {
  if (hooks) {
    const be = hooks.beforeEach;
    const ae = hooks.afterEach;
    const ba = hooks.beforeAll;
    const aa = hooks.afterAll;

    if (ba) beforeAll(ba);
    if (aa) afterAll(aa);
    if (be) beforeEach(be);
    if (ae) afterEach(ae);
  }
}
