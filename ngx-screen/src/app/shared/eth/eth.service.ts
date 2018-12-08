

import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

import { environment } from "../../../environments/environment"



declare let require: any;
declare let window: any;

import { ethers } from 'ethers';

import { Subject } from 'rxjs';

@Injectable()
export class EthService {
    

    currentUser : any

    user = new Subject();
    userInfo : any

    constructor() {

        // set default user
        this.currentUser = environment.configuration[0]
    
        this.user.subscribe(
            user=>{
                this.userInfo = user
            }
        )
    }






    convertEth(wei) {
        let w = ethers.utils.bigNumberify(""+wei);
        return (ethers.utils.formatEther(w));
    }

}