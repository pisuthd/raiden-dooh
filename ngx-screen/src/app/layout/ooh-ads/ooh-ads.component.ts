import { Component, OnInit } from '@angular/core';
import  {EthService , Ad} from '../../shared/eth/eth.service'
@Component({
  selector: 'app-ooh-ads',
  templateUrl: './ooh-ads.component.html',
  styleUrls: ['./ooh-ads.component.scss']
})
export class OohAdsComponent implements OnInit {

  ads = []

  myAddress

  constructor(
    private ethService : EthService
  ) { }

  ngOnInit() {
    this.myAddress = this.ethService.userInfo.address
    
    this.ethService.user.subscribe(
      tick =>{
        this.ads = []
        this.loadAds()
      }
    )

    this.loadAds()
  }

  loadAds() {
    this.ethService.totalAd().then(
      totalAd =>{
        const total = Number(totalAd.toString())
        for (let i=1;i<total+1;i++) {
          this.ethService.getAd(i).then(
            detail=>{
              //let item  = new Screen(i, Number(detail[0].toString()), detail[1], detail[2], Number(detail[3].toString()), Number(detail[4].toString()))
              let item = new Ad(i, detail[0], detail[1], detail[2])
              
              if (item.owner == this.myAddress ) {
                this.ads.push(item)
              }
              if (this.ads.length == total) {
                console.log('ads-->',this.ads)
              }
            })
        }
      }
    )
  }

}
