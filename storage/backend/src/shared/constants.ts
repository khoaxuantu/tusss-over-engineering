export const CommonMessage = {
  error: {
    create: "errors.create",
    duplicated: "errors.duplicated",
    corruptedData: "errors.corrupted_data",
    db: "errors.db",
    notFound: "errors.not_found",
  },
  ok: {
    create: "ok.create",
  },
} as const;

export const TestErrorMessage = "[Test] Error";

export const PaginationDefault = {
  page: 1,
  perPage: 10,
};
