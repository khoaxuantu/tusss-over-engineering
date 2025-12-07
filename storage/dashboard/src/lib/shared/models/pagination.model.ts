export class PaginationModel {
  static default = {
    page: 1,
    perPage: 10,
  } as const;

  page: number;
  perPage: number;

  constructor(data?: { page?: number; pageSize?: number }) {
    this.page = data?.page ?? PaginationModel.default.page;
    this.perPage = data?.pageSize ?? PaginationModel.default.perPage;
  }
}
