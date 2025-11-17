"use client";

import { BackendUrl } from "@lib/configs/client";
import {
  BaseRecord,
  CreateResponse,
  DataProvider,
  DeleteOneResponse,
  GetListResponse,
  GetOneResponse,
  UpdateResponse,
} from "@refinedev/core";

export const ResourceClientSideProvider: DataProvider = {
  getOne: async <TData = BaseRecord>(): Promise<GetOneResponse<TData>> => {
    return {
      data: {} as TData,
    };
  },
  update: async <TData = BaseRecord>(): Promise<UpdateResponse<TData>> => {
    return {
      data: {} as TData,
    };
  },
  create: async <TData = BaseRecord>(): Promise<CreateResponse<TData>> => {
    return {
      data: {} as TData,
    };
  },
  deleteOne: async <TData = BaseRecord>(): Promise<DeleteOneResponse<TData>> => {
    return {
      data: {} as TData,
    };
  },
  getList: async <TData = BaseRecord>(): Promise<GetListResponse<TData>> => {
    return {
      data: [] as TData[],
      total: 0,
    };
  },
  getApiUrl: () => BackendUrl,
};
