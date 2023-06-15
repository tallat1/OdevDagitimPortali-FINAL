import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { OgretmenComponent } from './components/ogretmen/ogretmen.component';
import { OgrenciComponent } from './components/ogrenci/ogrenci.component';
import { DersComponent } from './components/ders/ders.component';
import { OdevComponent } from './components/odev/odev.component';
import { OgrencilisteleComponent } from './components/ogrencilistele/ogrencilistele.component';
import { OdevlisteleComponent } from './components/odevlistele/odevlistele.component';
import { OdevlistebydersıdComponent } from './components/odevlistebydersıd/odevlistebydersıd.component';
import { OdevogrencilisteComponent } from './components/odevogrenciliste/odevogrenciliste.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './services/AuthGuard';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    data: {
      yetkiler: ["Uye"],
      gerigit: "/ogrenci"
    }
  },
  {
    path: 'ogretmen',
    component: OgretmenComponent,
    canActivate: [AuthGuard],
    data: {
      yetkiler: ["Admin", "Uye"],
      gerigit: "/login"
    }

  },
  {
    path: 'ogrenci',
    component: OgrenciComponent,
    canActivate: [AuthGuard],
    data: {
      yetkiler: ["Admin"],
      gerigit: "/"
    }
  },
  {
    path: 'ders',
    component: DersComponent,
    canActivate: [AuthGuard],
    data: {
      yetkiler: ["Admin", "Uye"],
      gerigit: "/login"
    }
  },
  {
    path: 'odev',
    component: OdevComponent,
    canActivate: [AuthGuard],
    data: {
      yetkiler: ["Admin", "Uye"],
      gerigit: "/login"
    }
  },
  {
    path: 'ogrencilistele',
    component: OgrencilisteleComponent
  },
  {
    path: 'odevlistele/:ogrId',
    component: OdevlisteleComponent
  },
  {
    path: 'odevlistelebyderıd/:dersId',
    component: OdevlistebydersıdComponent
  },
  {
    path: 'odevogrliste/:odevId',
    component: OdevogrencilisteComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
