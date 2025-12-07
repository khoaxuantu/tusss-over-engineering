import { DecimalPrecision, PaginationDefault } from "@tusss/core";

export interface PaginationParams {
  page: number;
  perPage: number;
}

export interface PaginationResultParams extends PaginationParams {
  total: number;
}

export class Pagination implements PaginationParams {
  page: number;
  perPage: number;

  constructor(data?: Partial<PaginationParams>) {
    this.page = data?.page ?? PaginationDefault.page;
    this.perPage = data?.perPage ?? PaginationDefault.perPage;
  }

  get skip() {
    return (this.page - 1) * this.perPage;
  }

  get limit() {
    return this.perPage;
  }
}

export class PaginationResult implements PaginationResultParams {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
  nextPage?: number;
  prevPage?: number;

  constructor(data: PaginationResultParams);
  constructor(data: Pagination, total: number);
  constructor(data: Pagination | PaginationResultParams, total: number = 0) {
    this.page = data.page;
    this.perPage = data.perPage;

    if (data instanceof Pagination) this.total = total;
    else this.total = data.total;

    this.totalPages = DecimalPrecision.ceil(this.total / this.perPage);

    if (this.page + 1 <= this.totalPages) this.nextPage = this.page + 1;
    if (this.page > 1) this.prevPage = this.page - 1;
  }
}

export class Paginable<TData> {
  data: TData[];
  pagination: PaginationResult;

  constructor(data: TData[], pagination: PaginationResult) {
    this.data = data;
    this.pagination = pagination;
  }
}
