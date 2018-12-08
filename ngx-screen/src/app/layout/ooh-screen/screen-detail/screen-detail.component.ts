import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from "@angular/router";
import { Observable, Subject } from "rxjs/Rx";
import { EthService, Ad, Publisher, Screen } from '../../../shared/eth/eth.service'

import { RaidenService } from '../../../shared/raiden/raiden.service'
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-screen-detail',
  templateUrl: './screen-detail.component.html',
  styleUrls: ['./screen-detail.component.scss']
})
export class ScreenDetailComponent implements OnInit {

  current_id
  screen
  ad
  ads = []


  clock = new Subject()

  constructor(
    private raidenService: RaidenService,
    private ethService: EthService,
    private router: Router,
    private route: ActivatedRoute) { }


  ngOnDestroy() {
    try {
      this.clock.unsubscribe()
    } catch (e) {

    }

  }
  ngOnInit() {

    this.clock.subscribe(
      tick => {
        console.log('clearing...')

        console.log('screen', this.screen)
        console.log('ad', this.ad)
        const adOwner = this.ad.owner
        // need to use nucrypher
        this.ethService.getPublisher(this.screen.publisher_id).then(
          detail => {

            const pubAddress = detail[0]
            let users = environment.configuration
            for (let user of users) {
              if (user.address == adOwner) {
                const host = user.raiden_host
                this.raidenService.payment(host, pubAddress, this.screen.rate).subscribe(
                  result => {
                    console.log('payment result->', result)
                  }
                )
              }
            }

          }
        )

        if (this.screen) {
          let interval = this.screen.interval
          setTimeout(() => {
            this.clock.next(true)
          }, interval * 1000)
        } else {
          setTimeout(() => {
            this.clock.next(true)
          }, 3000)
        }


      }
    )

    this.route.params.subscribe(params => {
      this.current_id = params['id']
      console.log('set current id ->', this.current_id)
      this.load()
    })
  }
  load() {
    this.ethService.getScreen(this.current_id).then(
      detail => {
        //console.log('detail-->',detail)
        this.screen = new Screen(this.current_id, Number(detail[0].toString()), detail[1], detail[2], Number(detail[3].toString()), Number(detail[4].toString()))

        setTimeout(() => {
          this.clock.next(true)
        }, 3000)

        this.ethService.totalTask().then(
          totalTask => {
            const total = Number(totalTask.toString())
            let count = 0;
            for (let i = 1; i < total + 1; i++) {
              this.ethService.getTask(i).then(
                detail => {

                  let s = {
                    screen_id: Number(detail[0].toString()),
                    ad_id: Number(detail[1])
                  }
                  if (s.screen_id == this.current_id) {
                    this.ethService.getAd(s.ad_id).then(
                      detail => {
                        count = count + 1;
                        this.ad = new Ad(s.ad_id, detail[0], detail[1], detail[2])
                        /*
                        let ad = new Ad(s.ad_id, detail[0], detail[1], detail[2])
                        this.ads.push(ad)
                        console.log(this.ads.length, total)
                        console.log(this.ads)
                        if (this.ads.length == count) {
                          console.log('completed')
                          let max_id = 0
                          for (let ad of this.ads) {
                            if (ad.id > max_id) {
                              max_id = ad.id
                              this.ad = ad
                            }
                          }
                        }*/
                        // start watcher
                        //this.clock.next(true)
                      }
                    )
                  }

                })
            }
          }
        )
      }
    )
  }

}
