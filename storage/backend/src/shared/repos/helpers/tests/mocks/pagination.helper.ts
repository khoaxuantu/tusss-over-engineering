import { PaginationHelper } from "../../pagination.helper";

export class MockPaginationHelper<O extends Record<string, any>>
  implements Record<keyof PaginationHelper, any>
{
  count = jest.fn().mockResolvedValue(0) as jest.Mock<Promise<number>>;
  fetch = jest.fn().mockResolvedValue([]) as jest.Mock<Promise<O[]>>;

  constructor(props?: Partial<PaginationHelper>) {
    if (props?.count) this.count.mockImplementation(props.count);
    if (props?.fetch) this.fetch.mockImplementation(props.fetch as () => Promise<O[]>);
  }
}
