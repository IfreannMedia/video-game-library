import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError as observableThrowError } from "rxjs";
import {catchError} from 'rxjs/operators';

@Injectable()
export class HttpHeadersInterceptor implements HttpInterceptor {

    constructor(){}

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        req = req.clone({
            setHeaders: {
                'x-rapidapi-key': 'KEY HERE',
                'x-rapidapi-host': 'rawg-video-games-database.p.rapidapi.com' 
            },
            setParams: {
                key: 'e40addKeyHere123'
            }
        });
        return next.handle(req);
    }
} 