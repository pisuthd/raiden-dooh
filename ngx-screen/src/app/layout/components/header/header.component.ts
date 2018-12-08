import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import  {EthService } from '../../../shared/eth/eth.service'
import { RaidenService , User } from '../../../shared/raiden/raiden.service'
import { environment } from '../../../../environments/environment'


import { Subject } from 'rxjs';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit , OnDestroy {
    public pushRightClass: string;


    users = []

    select : User

    updater = new Subject()

    constructor(
        private translate: TranslateService, 
        public router: Router,
        private ethService : EthService,
        private raidenService : RaidenService
    ) {

        

        this.translate.addLangs(['en', 'fr', 'ur', 'es', 'it', 'fa', 'de', 'zh-CHS']);
        this.translate.setDefaultLang('en');
        const browserLang = this.translate.getBrowserLang();
        this.translate.use(browserLang.match(/en|fr|ur|es|it|fa|de|zh-CHS/) ? browserLang : 'en');

        this.router.events.subscribe(val => {
            if (
                val instanceof NavigationEnd &&
                window.innerWidth <= 992 &&
                this.isToggled()
            ) {
                this.toggleSidebar();
            }
        });

        // retreive configuration
        this.users = environment.configuration
        this.select = this.ethService.currentUser
        this.select.channels = []
        



        this.loadInfo()
    }

    getUsernameFromAddress(address) {
        let username = ''
        for (let user of this.users) {
            if (user.address == address) {
                username = user.name
                break
            }
        }
        return username
    }

    loadInfo() {
        console.log('load info for ',this.select)
        this.ethService.user.next(this.select)
        //this.select.balance = 0
        this.raidenService.listChannels(this.select.raiden_host).subscribe(
            channels=>{
                console.log('loadInfo result->',channels)
                
                this.select.channels = []
                this.select.balance = 0
                for (let channel of channels) {

                    channel['username'] = this.getUsernameFromAddress(channel.partner_address)
                    // fixme : not sure whether using total_deposit or balance
                    channel['balanceETH'] = this.ethService.convertEth(channel.balance)
                    this.select.balance += channel['balanceETH']
                }
                this.select.channels = channels

            }
        )
    }   

    changeUser(username) {
        for (let user of this.users) {
            if (user.name == username) {
                this.select = user
                this.select.channels = []
                break
            }
        }

        this.loadInfo()
    }

    ngOnInit() {
        this.updater.subscribe(
            tick =>{
                this.loadInfo()

                setTimeout(()=>{
                    this.updater.next(true)
                },3000)
            }
        )

        this.updater.next(true)
        this.pushRightClass = 'push-right';
    }

    ngOnDestroy() {
        try {
            this.updater.unsubscribe()
        } catch (e) {

        }
        
    }

    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    rltAndLtr() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('rtl');
    }

    onLoggedout() {
        localStorage.removeItem('isLoggedin');
    }

    changeLang(language: string) {
        this.translate.use(language);
    }
}
