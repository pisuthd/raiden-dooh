import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { OohHomeComponent } from './ooh-home/ooh-home.component';
import { OohAdsComponent } from './ooh-ads/ooh-ads.component';
import { OohScreenComponent } from './ooh-screen/ooh-screen.component';
import { OohAboutComponent } from './ooh-about/ooh-about.component';
import { ScreenDetailComponent } from './ooh-screen/screen-detail/screen-detail.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'prefix' },
            { path : 'home' , component: OohHomeComponent},
            { path:'ads' ,component : OohAdsComponent} ,

            { path : 'screen' , component : OohScreenComponent} ,
            { path : 'screen/:id' , component : ScreenDetailComponent} ,
            { path : 'about' , component : OohAboutComponent }, 
            
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
