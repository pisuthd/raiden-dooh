

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

    payment(url,address,amount) {
        let data = {
            amount : amount
        }

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        // hardcode ethsg token
        return this.http.post(url+"/api/1/payments/0x98a345f06e3A5DFe28EE0af38dd0780b4C0ed73B/"+address,data, options)
            .map((res: Response) => res.json())
            .catch(
                (error: Response) => {
                    return Observable.throw(error);
                }
            )

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