import { HttpResponse, HttpRequest } from './http'

export interface Controller {
  handle: (httpRequest: HttpRequest) => HttpResponse
}
