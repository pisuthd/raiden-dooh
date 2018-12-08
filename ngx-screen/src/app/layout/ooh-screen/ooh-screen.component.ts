import { Component, OnInit } from '@angular/core';

import { EthService, Ad, Publisher, Screen } from '../../shared/eth/eth.service'

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

  myAddress

  constructor(
    private ethService: EthService
  ) {

  }


  
  ngOnInit() {

    this.myAddress = this.ethService.userInfo.address

    this.loadPubs()
    /*
    this.ethService.totalAd().then(
      totalAd=>{
        console.log('totalAd-->',totalAd.toString())
        const total = Number(totalAd.toString())


      }
    )*/

    this.ethService.user.subscribe(
      tick => {
        //this.ads = []
        //this.loadAds()
      }
    )

    this.loadAds()
  }
  loadTask() {
    this.ethService.totalTask().then(
      totalTask => {
        console.log('totalTask-->', totalTask.toString())
        const total = Number(totalTask.toString())
        
        for (let i = 1; i < total + 1; i++) {
          console.log('getting task')
          this.ethService.getTask(i).then(
            detail =>{
              console.log('detail',detail)

              let s = {
                screen_id : Number(detail[0].toString()),
                ad_id : Number(detail[1])
              }
              

              for (let screen of this.screens) {
                //console.log('ssss',screen)
                if (screen.id == s.screen_id) {
                  if (!screen.tasks) {
                    screen['tasks'] = []
                  }
                  screen.tasks.push(s.ad_id)
                }
              }
              

            }
          )
        }
      }
    )
  }
  loadScreens() {

    this.ethService.totalScreen().then(
      totalScreen => {
        console.log('totalScreen-->', totalScreen.toString())
        const total = Number(totalScreen.toString())
        for (let i = 1; i < total + 1; i++) {
          this.ethService.getScreen(i).then(
            detail => {
              //console.log('detail-->',detail)
              let item = new Screen(i, Number(detail[0].toString()), detail[1], detail[2], Number(detail[3].toString()), Number(detail[4].toString()))
              for (let pub of this.pubs) {
                if (pub.id == item.publisher_id) {
                  item['publisher'] = pub
                  break;
                }
              }
              this.screens.push(item)
              if (this.screens.length == total) {
                console.log('screens-->', this.screens)
                this.loadTask()
              }

            }
          )
        }

      }
    )
  }

  loadAds() {
    this.ethService.totalAd().then(
      totalAd => {
        const total = Number(totalAd.toString())
        for (let i = 1; i < total + 1; i++) {
          this.ethService.getAd(i).then(
            detail => {
              //let item  = new Screen(i, Number(detail[0].toString()), detail[1], detail[2], Number(detail[3].toString()), Number(detail[4].toString()))
              let item = new Ad(i, detail[0], detail[1], detail[2])

              if (item.owner == this.myAddress) {
                this.ads.push(item)
              }
              if (this.ads.length == total) {
                console.log('ads-->', this.ads)
              }
            })
        }
      }
    )
  }
  post(value, screen_id) {
    //alert('Sorry this function is not available. Please use remix!')

    let ad_id = 0;
    for (let ad of this.ads) {
      if (ad.title == value) {
        ad_id = ad.id
      }
    }
    //alert(ad_id+" --- "+screen_id)
    this.ethService.submitTask(screen_id, ad_id, this)


  }

  reload() {
    this.ads = []
    this.pubs = []
    this.screens = []
    this.myAddress = this.ethService.userInfo.address

    this.loadPubs()
    this.loadAds()
  }

  loadPubs() {
    this.ethService.totalPub().then(
      totalPub => {
        console.log('totalPub-->', totalPub.toString())
        const total = Number(totalPub.toString())
        for (let i = 1; i < total + 1; i++) {
          this.ethService.getPublisher(i).then(
            detail => {
              //console.log('detail-->',detail)
              let item = new Publisher(i, detail[0], detail[1])
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
