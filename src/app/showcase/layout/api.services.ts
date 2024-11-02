import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { OPERATIONS } from './app.constants';
import { environment } from 'src/environments/environment';
import { createRequestOption } from '../utils/request';

@Injectable({ providedIn: 'root' })
export class ApiServices {
  public base_url = environment.apiUrl;
  constructor(protected http: HttpClient) {}
  create(request: any, entity: any): Observable<HttpResponse<any>> {
    return this.http.post<any>(
      this.base_url + request + OPERATIONS.CREATE,
      entity,
      { observe: 'response' }
    );
  }
  update(request: any, entity: any): Observable<HttpResponse<any>> {
    return this.http.put<any>(
      this.base_url + request + OPERATIONS.UPDATE + '?id=' + entity.id,
      entity,
      {
        observe: 'response',
      }
    );
  }
  get(requestUrl: any): Observable<HttpResponse<any>> {
    return this.http.get<any>(this.base_url + requestUrl, {
      observe: 'response',
    });
  }
  getOption(
    requestUrl: any,
    params: any,
    option: any
  ): Observable<HttpResponse<any>> {
    const options = createRequestOption(params);
    return this.http.get<any>(this.base_url + requestUrl + option, {
      params: options,
      observe: 'response',
    });
  }

  getOptionWithHeaders(
    requestUrl: any,
    params: any,
    option: any,
    headers : any
  ): Observable<HttpResponse<any>> {
    const options = createRequestOption(params);
    return this.http.get<any>(this.base_url + requestUrl + option, {
      headers: headers,
      params: options,
      observe: 'response',
    });
  }

  put(
    requestUrl: any,
    entity: any,
    option: any
  ): Observable<HttpResponse<any>> {
    return this.http.put<any>(this.base_url + requestUrl + option, entity, {
      observe: 'response',
    });
  }
  post(requestUrl: any, option: any): Observable<HttpResponse<any>> {
    return this.http.post<any>(this.base_url + requestUrl + option, {
      observe: 'response',
    });
  }
  postOptionWithHeaders(
    requestUrl: any,
    entity: any,
    option: any,
    header: any
  ): Observable<HttpResponse<any>> {
    return this.http.post<any>(this.base_url + requestUrl + option, entity, {
      observe: 'response',
      headers: header,
    });
  }

  postOption(
    requestUrl: any,
    entity: any,
    option: any
  ): Observable<HttpResponse<any>> {
    return this.http.post<any>(this.base_url + requestUrl + option, entity, {
      observe: 'response',
    });
  }
  delete(requestUrl: any, id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.base_url + requestUrl + '?id='}${id}`, {
      observe: 'response',
    });
  }
  deleteOption(requestUrl: any, id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.base_url + requestUrl + id}`, {
      observe: 'response',
    });
  }
  query(requestUrl: any, req: any): Observable<HttpResponse<any>> {
    const options = createRequestOption(req);
    return this.http.get<any>(this.base_url + requestUrl + OPERATIONS.SEARCH, {
      params: options,
      observe: 'response',
    });
  }
  uploadFile(requestUrl: any, file: any): Observable<HttpResponse<any>> {
    return this.http.post<any>(this.base_url + requestUrl, file, {
      observe: 'response',
    });
  }
}
