import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Kayit } from 'src/app/models/Kayit';
import { Odev } from 'src/app/models/Odev';
import { Ogrenci } from 'src/app/models/Ogrenci';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { MatTableDataSource } from '@angular/material/table';
import { Sonuc } from 'src/app/models/Sonuc';
import { Ogretmen } from 'src/app/models/Ogretmen';
import { Ders } from 'src/app/models/Ders';


@Component({
  selector: 'app-odevlistele',
  templateUrl: './odevlistele.component.html',
  styleUrls: ['./odevlistele.component.css']
})
export class OdevlisteleComponent implements OnInit {
  secOgrenci: Ogrenci;
  ogrId: string;

  dersId: string = "";
  odevId: string = "";
  ogretmenId: string = "";
  kayitTeslimTarih: string = "";

  kayitlar: Kayit[];
  dersler: Ders[];
  odevler: Odev[];
  ogretmenler: Ogretmen[];


  secDers: Ders = new Ders();
  secOdev: Odev = new Odev();

  

  dataSource: any;
  displayedColumns = ['logo', 'ogretmenAdSoyad', 'odevDersAdi', 'odevAdi', 'kayitTarih','kayitTeslimTarih', 'islemler'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;

  constructor(
    public apiServis: ApiService,
    public route: ActivatedRoute,
    public alert: MyAlertService,
    public matDialog: MatDialog,

  ) { }

  ngOnInit() {


    


    // this.OdeListeGetir();
    // this.OgretmeListeGetir();
    // this.DersListeGetir();
    // this.route.params.subscribe((p: any) => {
    //   if (p) {
    //     this.ogrId = p.ogrId;
    //     this.OgrenciGetir();
    //     this.OdevListeGetir();
    //   }
    // });


    ///////
    this.OgrenciGetir();
    this.OgretmeListeGetir();
    this.DersListeGetir();
    this.route.params.subscribe((p: any) => {
      if (p) {
        this.ogrId = p.ogrId;
        this.OgrenciGetir();
        this.OdevListeGetir();
      }
    });
    this.OdeListeGetir();

    this.route.params.subscribe((p: any) => {
      if (p.katId) {
        this.dersId = p.katId;
        this.DersGetir();
      }
    });
    this.DersListeGetir();
    /////

  }


  OdevGetir() {
    this.apiServis.OdevById(this.odevId).subscribe((d: Odev) => {
      this.secOdev = d;
      this.OdevListeleByDersId();
    })
  }

  OdevListeleByDersId() {
    this.apiServis.OdevListeByDersId(this.dersId).subscribe((d: Odev[]) => {
      this.odevler = d;
    })
  }


  DersGetir() {
    this.apiServis.DersById(this.dersId).subscribe(d => {
      this.secDers = d;
      this.OdevListeleByDersId();
    });
  }



  OgrenciGetir() {
    this.apiServis.OgrenciById(this.ogrId).subscribe(d => {
      this.secOgrenci = d;
    });
  }

  OdevListeGetir() {
    this.apiServis.OgrenciOdevListe(this.ogrId).subscribe(d => {
      this.kayitlar = d;
      this.dataSource = new MatTableDataSource(d);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }



  DersSec(d: string) {
    this.dersId = d;
    this.DersGetir();
  }

  OdevSec(d: string) {
    this.odevId = d;
    this.OdevGetir();
  }

  OgretmenSec(d: string) {
    this.ogretmenId = d;
  }

 

  Kaydet() {
    if (this.odevId == "") {
      var s: Sonuc = new Sonuc();
      s.islem = false;
      s.mesaj = "Odev Seçiniz!";
      this.alert.AlertUygula(s);
    } else {

      var kayit = new Kayit();
      kayit.kayitOgrId = this.ogrId;
      kayit.kayitOdevId = this.odevId;
      kayit.kayitOgretmenId = this.ogretmenId;
      kayit.kayitTeslimTarih = this.kayitTeslimTarih;
      this.apiServis.KayitEkle(kayit).subscribe(s => {
        this.alert.AlertUygula(s);
        if (s.islem) {
          this.OdevListeGetir();
        }
      });
    }

  }
  OdevSil(kayit: Kayit) {
    this.confirmDialogRef = this.matDialog.open(ConfirmDialogComponent, {
      width: "400px"
    });
    this.confirmDialogRef.componentInstance.dialogMesaj = kayit.odevBilgi.odevAdi + " Odev Kaydı Silinecektir Onaylıyor musunuz?";
    { } this.confirmDialogRef.afterClosed().subscribe(d => {
      if (d) {
        this.apiServis.KayitSil(kayit.kayitId).subscribe(s => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.OdevListeGetir();
          }
        });
      }
    });
  }

  DersListeGetir() {
    this.apiServis.DersListe().subscribe(d => {
      this.dersler = d;
    });
  }

  OdeListeGetir() {
    this.apiServis.OdevListe().subscribe(d => {
      this.odevler = d;
    });
  }

  OgretmeListeGetir() {
    this.apiServis.OgretmenListe().subscribe(d => {
      this.ogretmenler = d;
    });
  }
}
