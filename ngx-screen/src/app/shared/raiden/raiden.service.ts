

import { Router } from '@angular/router';


import { environment } from "../../../environments/environment"


import { EventEmitter, Injectable } from "@angular/core";
import { Headers, Http, Response, URLSearchParams, RequestOptions } from "@angular/http";
import { Observable, Subject } from 'rxjs';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

declare let require: any;
declare let window: any;

export class User {
    name : string
    raiden_host: string
    address : string
    channels : []
    balance : number
}


@Injectable()
export class RaidenService { 

    constructor(
        private http: Http
    ) {

    }

    listChannels(url : string) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this.http.get(url+"/api/1/channels", options)
            .map((res: Response) => res.json())
            .catch(
                (error: Response) => {
                    return Observable.throw(error);
                }
            )
    }
}