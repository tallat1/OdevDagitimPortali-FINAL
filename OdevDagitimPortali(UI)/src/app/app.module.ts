import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { MaterialModule } from './material.module';
import { AlertDialogComponent } from './components/dialogs/alert-dialog/alert-dialog.component';
import { MyAlertService } from './services/myAlert.service';
import { Sonuc } from './models/Sonuc';
import { ConfirmDialogComponent } from './components/dialogs/confirm-dialog/confirm-dialog.component';
import { ApiService } from './services/api.service';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { DersComponent } from './components/ders/ders.component';
import { OdevComponent } from './components/odev/odev.component';
import { OgrenciComponent } from './components/ogrenci/ogrenci.component';
import { OgretmenComponent } from './components/ogretmen/ogretmen.component';
import { OgrenciDialogComponent } from './components/dialogs/ogrenci-dialog/ogrenci-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { OgrencilisteleComponent } from './components/ogrencilistele/ogrencilistele.component';
import { OgrsecDialogComponent } from './components/dialogs/ogrsec-dialog/ogrsec-dialog.component';
import { FotoDialogComponent } from './components/dialogs/foto-dialog/foto-dialog.component';
import { OdevlisteleComponent } from './components/odevlistele/odevlistele.component';
import { OdevDialogComponent } from './components/dialogs/odev-dialog/odev-dialog.component';
import { OgretmenDialogComponent } from './components/dialogs/ogretmen-dialog/ogretmen-dialog.component';
import { DersDialogComponent } from './components/dialogs/ders-dialog/ders-dialog.component';
import { DatePipe } from '@angular/common';
import { OdevlistebydersıdComponent } from './components/odevlistebydersıd/odevlistebydersıd.component';
import { OdevogrencilisteComponent } from './components/odevogrenciliste/odevogrenciliste.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms'
import { SafeHtmlPipe } from './pipes/safeHtml-pipe.pipe';
import { Authinterceptor } from './services/Authinterceptor';
import { AuthGuard } from './services/AuthGuard';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MainNavComponent,
    DersComponent,
    OdevComponent,
    OdevlisteleComponent,
    OgrenciComponent,
    OgrencilisteleComponent,
    OgretmenComponent,
    OdevlistebydersıdComponent,
    OdevogrencilisteComponent,
    LoginComponent,
    SafeHtmlPipe,
    



    //Dialoglar

    AlertDialogComponent,
    ConfirmDialogComponent,
    OgrenciDialogComponent,
    OgrsecDialogComponent,
    FotoDialogComponent,
    OdevDialogComponent,
    OgretmenDialogComponent,
    DersDialogComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  

  ],

  //Dialoglar
  entryComponents: [
    AlertDialogComponent,
    ConfirmDialogComponent,
    OgrenciDialogComponent,
    OgrsecDialogComponent,
    FotoDialogComponent,
    OdevDialogComponent,
    OgretmenDialogComponent,
    DersDialogComponent

  ],

  providers: [MyAlertService, ApiService, DatePipe, SafeHtmlPipe, AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: Authinterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
