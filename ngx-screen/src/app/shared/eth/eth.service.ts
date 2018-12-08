

import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

import { environment } from "../../../environments/environment"



declare let require: any;
declare let window: any;

import { ethers } from 'ethers';

import { Subject } from 'rxjs';

// example for screen
// 1,"Office Lobby","secret",10000000000000000,10
// 1,"Lift to Car Park","secret",10000000000000000,10
// 1,"Retail Drop-Off","secret",10000000000000000,10

export class Screen {
    id : number
    publisher_id : number
    title : string
    secret : string
    rate : number
    interval : number

    constructor(id, publisher_id, title, secret, rate, interval) {
        this.id = id;
        this.publisher_id = publisher_id;
        this.title = title;
        this.secret = secret; 
        this.rate = rate;
        this.interval = interval;
    }

}

// example for publisher
// 0x0,the bridge SG

export class Publisher {
    id : number
    address :string
    title : string
    constructor(id,address, title) {
        this.id = id
        this.address  = address;
        this.title = title;
    }
}

@Injectable()
export class EthService {
    

    currentUser : any

    user = new Subject();
    userInfo : any


    constractAddress = "0x1d2cee1f7b424ca120da16408a0402813ff13663"

    contract

    constructor() {

        // set default user
        this.currentUser = environment.configuration[0]
    
        this.user.subscribe(
            user=>{
                this.userInfo = user
            }
        )

        let provider = ethers.getDefaultProvider('kovan');
        let contractAddress = this.constractAddress;
        this.contract = new ethers.Contract(contractAddress, this.abi, provider);

    }






    convertEth(wei) {
        let w = ethers.utils.bigNumberify(""+wei);
        return (ethers.utils.formatEther(w));
    }

    totalAd() {
        return this.contract.numAd()
    }

    totalScreen() {
        return this.contract.numScreen()
    }

    totalPub() {
        return this.contract.numPublisher()
    }

    getScreen(id) {
        return this.contract.getScreen(id)
    }

    getPublisher(id) {
        return this.contract.getPublisher(id)
    }

    abi = [
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_owner",
                    "type": "address"
                },
                {
                    "name": "_title",
                    "type": "string"
                }
            ],
            "name": "registerPublisher",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_publisher_id",
                    "type": "uint256"
                },
                {
                    "name": "_title",
                    "type": "string"
                },
                {
                    "name": "_secret",
                    "type": "string"
                },
                {
                    "name": "_rate",
                    "type": "uint256"
                },
                {
                    "name": "_interval",
                    "type": "int256"
                }
            ],
            "name": "registerScreen",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "_id",
                    "type": "uint256"
                }
            ],
            "name": "getPublisher",
            "outputs": [
                {
                    "name": "",
                    "type": "address"
                },
                {
                    "name": "",
                    "type": "string"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "_owner",
                    "type": "address"
                }
            ],
            "name": "getPublisherByAddress",
            "outputs": [
                {
                    "name": "",
                    "type": "string"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "_owner",
                    "type": "address"
                }
            ],
            "name": "getPublisherId",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "_id",
                    "type": "uint256"
                }
            ],
            "name": "getScreen",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                },
                {
                    "name": "",
                    "type": "string"
                },
                {
                    "name": "",
                    "type": "string"
                },
                {
                    "name": "",
                    "type": "uint256"
                },
                {
                    "name": "",
                    "type": "int256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "numAd",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "numPublisher",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "numScreen",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "numTask",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }
    ]

}