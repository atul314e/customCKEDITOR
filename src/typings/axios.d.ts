/**
 * @author Harish.R <harish.r@314ecorp.com>
 * @description axios types
 */

declare type IAxiosInterceptors = Record<'request' | 'response' | 'reject', any>;

declare type IAxiosInstance = import('axios').AxiosInstance;
declare type IAxiosError = import('axios').AxiosError;
declare type IAxiosRequestConfig = import('axios').AxiosRequestConfig;
declare type IAxiosResponse = import('axios').AxiosResponse;
