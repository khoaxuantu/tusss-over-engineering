export interface ServerPlainResponse<T> {
  data: T;
  error?: {
    code: string;
    message: string;
  };
}

export class ServerActionResponse<T = undefined> implements ServerPlainResponse<T> {
  data: T;
  error?: { code: string; message: string } | undefined;

  constructor(props: ServerPlainResponse<T>) {
    this.data = props.data;
    this.error = props.error;
  }

  toPlain(): ServerPlainResponse<T> {
    return {
      data: this.data,
      error: this.error,
    };
  }
}
