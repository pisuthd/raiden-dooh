import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { OohHomeComponent } from './ooh-home/ooh-home.component';
import { OohAdsComponent } from './ooh-ads/ooh-ads.component';
import { OohScreenComponent } from './ooh-screen/ooh-screen.component';
import { OohAboutComponent } from './ooh-about/ooh-about.component';


@NgModule({
    imports: [
        CommonModule,
        LayoutRoutingModule,
        TranslateModule,
        NgbDropdownModule
    ],
    declarations: [
        LayoutComponent, 
        SidebarComponent, 
        HeaderComponent, OohHomeComponent, OohAdsComponent, OohScreenComponent, OohAboutComponent]
})
export class LayoutModule {}
