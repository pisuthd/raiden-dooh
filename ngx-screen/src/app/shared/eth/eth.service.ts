

import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

import { environment } from "../../../environments/environment"



declare let require: any;
declare let window: any;

import { ethers } from 'ethers';

import { Subject } from 'rxjs';



// example for ad
// "0xBdCC4678904D728A7394aabC7eeC76A3578eA4B2","cupcake promotion","https://s3-ap-southeast-1.amazonaws.com/gamedex-static/test/20181208_213315.jpg"
// "0xBdCC4678904D728A7394aabC7eeC76A3578eA4B2","avenger x","https://s3-ap-southeast-1.amazonaws.com/gamedex-static/test/20181208_213901.jpg"
// "0xBdCC4678904D728A7394aabC7eeC76A3578eA4B2","iphone xx","https://s3-ap-southeast-1.amazonaws.com/gamedex-static/test/20181208_214412.jpg"


export class Ad {
    id : number
    owner : string
    title :string
    image_url : string
    constructor(id, owner, title, image_url) {
        this.id = id
        this.owner = owner
        this.title  =title
        this.image_url = image_url
    }
}

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
// 0x6ff879Fc4a3799C428B98bfD1Aec053C08EddF63,"the bridge SG"

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


    constractAddress = "0xb0af72ecc67822ef11b58414eb56302a08a6fc38"

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

    totalTask() {
        return this.contract.numTask()
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
    getTask(id) {
        return this.contract.getTask(id)
    }

    getAd(id) {
        return this.contract.getAd(id)
    }

    getPublisher(id) {
        return this.contract.getPublisher(id)
    }
    // fixme: use metamask
    submitTask(screen_id,ad_id ,cb) {
        let provider = ethers.getDefaultProvider('kovan');
        let contractAddress = this.constractAddress
        var w = new ethers.Wallet('0x' + '51AB8CA456ABC9F29E8E0F043987069EE8BAA55C5C7BF93C4429AB3842C8ECE9', provider);
        const cc = new ethers.Contract(contractAddress, this.abi, w);
        let options = {
            gasLimit: 300000,
            gasPrice: ethers.utils.parseUnits('1.0', 'gwei')
        }
        cc.createTask(screen_id, ad_id,0).then(
            result=> {
              cb.reload()
       
            }
          )


    }

    abi = [
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
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "offset",
                    "type": "uint256"
                },
                {
                    "name": "owner",
                    "type": "address"
                }
            ],
            "name": "listAd",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256[]"
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
            "inputs": [
                {
                    "name": "_task_id",
                    "type": "uint256"
                }
            ],
            "name": "getTask",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                },
                {
                    "name": "",
                    "type": "uint256"
                },
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
            "constant": false,
            "inputs": [
                {
                    "name": "_id",
                    "type": "uint256"
                }
            ],
            "name": "deleteTask",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_screen_id",
                    "type": "uint256"
                },
                {
                    "name": "_ad_id",
                    "type": "uint256"
                },
                {
                    "name": "_bid",
                    "type": "uint256"
                }
            ],
            "name": "createTask",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "_ad_id",
                    "type": "uint256"
                }
            ],
            "name": "getAd",
            "outputs": [
                {
                    "name": "",
                    "type": "address"
                },
                {
                    "name": "",
                    "type": "string"
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
                    "name": "_owner",
                    "type": "address"
                },
                {
                    "name": "_title",
                    "type": "string"
                },
                {
                    "name": "_image_url",
                    "type": "string"
                }
            ],
            "name": "createAd",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
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
        }
    ]

}