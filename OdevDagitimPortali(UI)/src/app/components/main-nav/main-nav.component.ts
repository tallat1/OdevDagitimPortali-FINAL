import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { delay, filter, map, shareReplay } from 'rxjs/operators';
import { MatSidenav } from '@angular/material/sidenav';
import { NavigationEnd, Router } from '@angular/router';
import { untilDestroyed } from '@ngneat/until-destroy';
import { ApiService } from 'src/app/services/api.service';


var uyeYetkiler = localStorage.getItem("uyeYetkileri") || '{}';
var uyeYetkilerObjesi = JSON.parse(uyeYetkiler);

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit {

  admin = uyeYetkilerObjesi[0];

  kadi: string;


  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    public apiServis: ApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.apiServis.oturumKontrol()) {
      this.kadi = localStorage.getItem("kadi") || '{}';
    }
  }

  OturumKapat() {
    localStorage.clear();
    location.href = "/login";
  }



}
