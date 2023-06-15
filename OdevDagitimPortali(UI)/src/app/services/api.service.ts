import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ogrenci } from '../models/Ogrenci';
import { Ders } from '../models/Ders';
import { Ogretmen } from '../models/Ogretmen';
import { Odev } from '../models/Odev';
import { Sonuc } from '../models/Sonuc';
import { Kayit } from '../models/Kayit';
import { OgrFoto } from '../models/OgrFoto';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  apiUrl = "https://localhost:44398/api/"

  constructor(
    public http: HttpClient
  ) { }

  //Token
  tokenAl(kadi: string, parola: string) {
    var data = "username=" + kadi + "&password=" + parola + "&grant_type=password";
    var reqHeader = new HttpHeaders({ "Content-Type": "application/x-www-form-urlencoded" });
    return this.http.post(this.apiUrl + "/token", data, { headers: reqHeader });
  }

  
  oturumKontrol() {
    if (localStorage.getItem("token")) {
      return true;
    }
    else {
      return false;
    }
  }

  yetkiKontrol(yetkiler: any[]) {
    var sonuc: boolean = false;

    // var uyeYetkiler: string[] = JSON.parse(localStorage.getItem("uyeYetkileri"));
    var uyeYetkiler: string[]  = JSON.parse(localStorage.getItem("uyeYetkileri") || '{}');

    
    if (uyeYetkiler) {
      yetkiler.forEach(element => {
        if (uyeYetkiler.indexOf(element) > -1) {
          sonuc = true;
        }
      });
    }

    return sonuc;
  }

  ///////////////////////////////////////////////



  //Öğretmen
  OgretmenListe() {
    return this.http.get<Ogretmen[]>(this.apiUrl + "ogretmenliste");
  }
  OgretmenById(ogretmenId: string) {
    return this.http.get<Ogretmen>(this.apiUrl + "ogretmenbyid/" + ogretmenId);
  }
  OgretmenEkle(ogretmen: Ogretmen) {
    return this.http.post<Sonuc>(this.apiUrl + "ogretmenekle", ogretmen);
  }
  OgretmenDuzenle(ogretmen: Ogretmen) {
    return this.http.put<Sonuc>(this.apiUrl + "ogretmenduzenle", ogretmen);
  }
  OgretmenSil(ogretmenId: string) {
    return this.http.delete<Sonuc>(this.apiUrl + "ogretmensil/" + ogretmenId);
  }


  //Öğrenci
  OgrenciListe() {
    return this.http.get<Ogrenci[]>(this.apiUrl + "ogrenciliste");   // bu sekılde calısmakta
  }
  OgrenciById(ogrId: string) {
    return this.http.get<Ogrenci>(this.apiUrl + "ogrencibyid/" + ogrId);
  }
  OgrenciEkle(ogr: Ogrenci) {
    return this.http.post<Sonuc>(this.apiUrl + "ogrenciekle", ogr);
  }
  OgrenciDuzenle(ogr: Ogrenci) {
    return this.http.put<Sonuc>(this.apiUrl + "ogrenciduzenle", ogr);
  }
  OgrenciSil(ogrId: string) {
    return this.http.delete<Sonuc>(this.apiUrl + "ogrencisil/" + ogrId);
  }
  OgrFotoGuncelle(ogrFoto: OgrFoto) {
    return this.http.post<Sonuc>(this.apiUrl + "ogrfotoguncelle/", ogrFoto);
  }


  //Ders
  DersListe() {
    return this.http.get<Ders[]>(this.apiUrl + "dersliste");
  }
  DersById(dersId: string) {
    return this.http.get<Ders>(this.apiUrl + "dersbyid/" + dersId);
  }
  DersEkle(ders: Ders) {
    return this.http.post<Sonuc>(this.apiUrl + "dersekle", ders);
  }
  DersDuzenle(ders: Ders) {
    return this.http.put<Sonuc>(this.apiUrl + "dersduzenle", ders);
  }
  DersSil(ders: string) {
    return this.http.delete<Sonuc>(this.apiUrl + "derssil/" + ders);
  }


  //Odev
  OdevListe() {
    return this.http.get<Odev[]>(this.apiUrl + "odevliste");
  }
  OdevById(odevId: string) {
    return this.http.get<Odev>(this.apiUrl + "odevbyid/" + odevId);
  }
  OdevListeByDersId(dersId: string) {
    return this.http.get<Odev[]>(this.apiUrl + "odevlistebydersid/" + dersId);
  }
  OdevEkle(odev: Odev) {
    return this.http.post<Sonuc>(this.apiUrl + "odevekle", odev);
  }
  OdevDuzenle(odev: Odev) {
    return this.http.put<Sonuc>(this.apiUrl + "odevduzenle", odev);
  }
  OdevSil(odev: string) {
    return this.http.delete<Sonuc>(this.apiUrl + "odevsil/" + odev);
  }

  //kayit listeleme

  OgrenciOdevListe(ogrId: string) {
    return this.http.get<Kayit[]>(this.apiUrl + "ogrenciodevliste/" + ogrId);
  }
  OdevOgrenciListe(odevId: string) {
    return this.http.get<Kayit[]>(this.apiUrl + "odevogrenciliste/" + odevId);
  }
  OgretmenOdevListe(ogretmenId: string) {
    return this.http.get<Kayit[]>(this.apiUrl + "ogretmenodevliste/" + ogretmenId);
  }



  /* Kayıt API */
  KayitEkle(kayit: Kayit) {
    return this.http.post<Sonuc>(this.apiUrl + "kayitekle", kayit);
  }
  KayitSil(kayitId: string) {
    return this.http.delete<Sonuc>(this.apiUrl + "kayitsil/" + kayitId);
  }




}
