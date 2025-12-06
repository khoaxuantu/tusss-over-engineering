import { Pagination, PaginationResult } from "../pagination.model";

describe(Pagination.name, () => {
  test("skip", () => {
    const pagination = new Pagination({ page: 3, perPage: 10 });
    expect(pagination.skip).toEqual(20);
  });

  test("limit", () => {
    const pagination = new Pagination({ page: 3, perPage: 10 });
    expect(pagination.limit).toEqual(10);
  });
});

describe(PaginationResult.name, () => {
  const testModel = (
    pagination: PaginationResult,
    expected: {
      totalPages: number;
      nextPage?: number;
      prevPage?: number;
    },
  ) => {
    test("totalPages", () => {
      expect(pagination.totalPages).toEqual(expected.totalPages);
    });

    test("nextPage", () => {
      expect(pagination.nextPage).toEqual(expected.nextPage);
    });

    test("prevPage", () => {
      expect(pagination.prevPage).toEqual(expected.prevPage);
    });
  };

  describe("constructor overload", () => {
    test("from pagination object", () => {
      const pagination = new PaginationResult(new Pagination(), 100);
      expect(pagination.total).toEqual(100);
    });
  });

  describe("page: 3, perPage: 25, total: 70", () => {
    const pagination = new PaginationResult({ page: 3, perPage: 25, total: 70 });
    testModel(pagination, { totalPages: 3, prevPage: 2 });
  });

  describe("page: 1, perPage: 10, total: 50", () => {
    const pagination = new PaginationResult({ page: 1, perPage: 10, total: 50 });
    testModel(pagination, { totalPages: 5, nextPage: 2 });
  });

  describe("page: 4, perPage: 10, total: 50", () => {
    const pagination = new PaginationResult({ page: 4, perPage: 10, total: 50 });
    testModel(pagination, { totalPages: 5, nextPage: 5, prevPage: 3 });
  });
});
