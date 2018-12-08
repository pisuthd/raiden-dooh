import { Component, OnInit } from '@angular/core';

import { EthService, Publisher, Screen } from '../../shared/eth/eth.service'

@Component({
  selector: 'app-ooh-screen',
  templateUrl: './ooh-screen.component.html',
  styleUrls: ['./ooh-screen.component.scss']
})
export class OohScreenComponent implements OnInit {

  // for experiment only
  ads = []
  pubs = []
  screens = []

  constructor(
    private ethService : EthService
  ) {

   }

  ngOnInit() {

    this.loadPubs()
    /*
    this.ethService.totalAd().then(
      totalAd=>{
        console.log('totalAd-->',totalAd.toString())
        const total = Number(totalAd.toString())


      }
    )*/

    
  }
  loadScreens() {
    console.log('load ads')
    this.ethService.totalScreen().then(
      totalScreen=>{
        console.log('totalScreen-->',totalScreen.toString())
        const total = Number(totalScreen.toString())
        for (let i=1;i<total+1;i++) {
          this.ethService.getScreen(i).then(
            detail=>{
              //console.log('detail-->',detail)
              let item  = new Screen(i, Number(detail[0].toString()), detail[1], detail[2], Number(detail[3].toString()), Number(detail[4].toString()))
              for (let pub of this.pubs) {
                if (pub.id == item.publisher_id) {
                  item['publisher'] = pub
                  break;
                }
              }
              this.screens.push(item)
              if (this.screens.length == total) {
                console.log('screens-->',this.screens)
              }

            }
          )
        }

      }
    )
  }
  loadPubs() {
    this.ethService.totalPub().then(
      totalPub=>{
        console.log('totalPub-->',totalPub.toString())
        const total = Number(totalPub.toString())
        for (let i=1;i<total+1;i++) {
          this.ethService.getPublisher(i).then(
            detail=>{
              //console.log('detail-->',detail)
              let item = new Publisher(i,detail[0],detail[1])
              this.pubs.push(item)
              if (this.pubs.length == total) {
                this.loadScreens()
              }
            }
          )
        }
      }
    )
  }

}
