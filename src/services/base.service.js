// library
import Axios from "axios";
import axiosRetry from "axios-retry";
import { store } from "./../store/store";
import {REACT_APP_BASE_URL} from './../constant/baseurl'

const abortController = new AbortController();

export const cancelApi = () => {
  abortController.abort();
};

const retryDelay = (retryNumber = 0) => {
  const seconds = Math.pow(2, retryNumber) * 1000;
  const randomMs = 1000 * Math.random();
  return seconds + randomMs;
};

export class BaseService {
  constructor(alternativeBaseUrl) {
    this.axiosRequestConfig = {
      baseURL: alternativeBaseUrl ? alternativeBaseUrl : REACT_APP_BASE_URL,
    };

    this.axiosInstance = Axios.create(this.axiosRequestConfig);
    axiosRetry(this.axiosInstance, {
      retries: 2,
      retryDelay,
      retryCondition: axiosRetry.isRetryableError,
    });
  }

  baseUrl = "";

  static token = null;
  axiosInstance = Axios.create();
  axiosRequestConfigDefault = {
    baseURL: this.baseUrl,
    headers: { "Content-Type": "application/json" },
  };

  _axiosRequestConfig = this.axiosRequestConfigDefault;

  get axiosRequestConfig() {
    return this._axiosRequestConfig;
  }

  set axiosRequestConfig(config) {
    if (config.headers) {
      config.headers = {
        ...this._axiosRequestConfig.headers,
        ...config.headers,
      };
    }
    this._axiosRequestConfig = { ...this._axiosRequestConfig, ...config };
  }

  get axiosInstanceWithoutToken() {
    let axiosInstanceWithoutToken = this.axiosInstance;

    axiosInstanceWithoutToken.interceptors.response.use(
      function (response) {
        return response;
      },
      function (error) {
        return Promise.reject(error);
      }
    );

    return axiosInstanceWithoutToken;
  }

  get axiosInstanceWithToken() {
    let token = BaseService.token;

    let axiosInstanceWithToken;

    if (BaseService.token === null) {
      token = store.getState().user.token;
      if (token) BaseService.setToken(token);
    }

    if (token) {
      this.axiosRequestConfig = {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      };
      axiosInstanceWithToken = Axios.create({
        ...this.axiosRequestConfig,
      });
    } else {
      axiosInstanceWithToken = this.axiosInstance;
    }

    axiosInstanceWithToken.interceptors.response.use(
      function (response) {
        return response;
      },
      function (error) {
        if (error.response.status === 401 || error.response.status === 403) {
          localStorage.clear();
          sessionStorage.clear();
          window.location.href = "/";
        }
        return Promise.reject(error);
      }
    );

    return axiosInstanceWithToken;
  }

  static setToken(token) {
    BaseService.token = token;
  }

  static removeToken() {
    BaseService.token = null;
  }

  static msgRequestCanceled = "request-canceled";
  static cancelTokenSource() {
    return Axios.CancelToken.source();
  }
}
