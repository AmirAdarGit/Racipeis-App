import { BaseAction } from '../../types/base.redux.types';

export type HttpMethod =
  | 'get'
  | 'post'
  | 'put'
  | 'delete'
  | 'path'
  | 'head'
  | 'options';

type OnSuccess<ResponseBody> = (data: ResponseBody) => BaseAction | undefined | void;
type OnError = (error: any) => void;

export interface ApiAction<ResponseBody> extends BaseAction {
  meta: {
    api: true;
    cancellable?: boolean;
    jwt?: string;
    ignoreJwt?: boolean;
    [key: string]: any;
    IgnoreTrack?: boolean;
  };
  payload: {
    networkLabel: string;
    method: HttpMethod;
    timeout?: number;
    path: string;
    data?: any;
    multipart?: {
      files?: [{ name: string; file: File }];
      fields?: [{ name: string; value: any }];
    };
    baseUrl?: string;
    headers?: {
      [key: string]: string;
    };
    onSuccess?: OnSuccess<ResponseBody> | OnSuccess<ResponseBody>[];
    onError?: OnError | OnError[];
    navigateOnSuccess?: string;
  };
}
