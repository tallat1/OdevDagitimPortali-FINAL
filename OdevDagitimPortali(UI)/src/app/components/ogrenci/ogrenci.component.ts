import { Component, OnInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { Ogrenci } from 'src/app/models/Ogrenci';
import { ApiService } from 'src/app/services/api.service';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ViewChild } from '@angular/core'
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { OgrenciDialogComponent } from '../dialogs/ogrenci-dialog/ogrenci-dialog.component';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { FotoDialogComponent } from '../dialogs/foto-dialog/foto-dialog.component';


var uyeYetkiler = localStorage.getItem("uyeYetkileri") || '{}';
var uyeYetkilerObjesi = JSON.parse(uyeYetkiler);



@Component({
  selector: 'app-ogrenci',
  templateUrl: './ogrenci.component.html',
  styleUrls: ['./ogrenci.component.css']
})
export class OgrenciComponent implements OnInit {

  admin = uyeYetkilerObjesi[0];


  
  dataSource: any;
  ogrenciler: Ogrenci[];
  displayedColumns = ['ogrFoto', 'ogrNo', 'ogrAdsoyad', 'ogrDogTarih', 'ogrOdevSayisi', 'islemler'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;
  dialogRef: MatDialogRef<OgrenciDialogComponent>;
  fotoDialogRef: MatDialogRef<FotoDialogComponent>;



  constructor(
    public apiServis: ApiService,
    public matDialog: MatDialog,
    public alert: MyAlertService
  ) { }

  ngOnInit() {
    this.OgrenciListele();

  }

  OgrenciListele() {
    this.apiServis.OgrenciListe().subscribe(d => {
      this.ogrenciler = d;
      this.dataSource = new MatTableDataSource(d);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  OgrenciEkle() {
    var yeniKayit = new Ogrenci();
    this.dialogRef = this.matDialog.open(OgrenciDialogComponent, {
      width: "550px",
      height: "610px",
      data: {
        islem: 'ekle',
        kayit: yeniKayit
      }
    });

    this.dialogRef.afterClosed().subscribe(d => {
      if (d) {
        d.ogrFoto = "profil.png";
        this.apiServis.OgrenciEkle(d).subscribe(s => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.OgrenciListele();
          }
        });
      }
    });
  }
  OgrenciDuzenle(ogr: Ogrenci) {
    this.dialogRef = this.matDialog.open(OgrenciDialogComponent, {
      width: "550px",
      height: "610px",
      data: {
        islem: 'duzenle',
        kayit: ogr
      }
    });

    this.dialogRef.afterClosed().subscribe((d: Ogrenci) => {
      if (d) {
        ogr.ogrNo = d.ogrNo;
        ogr.ogrAdsoyad = d.ogrAdsoyad;
        ogr.ogrDogTarih = d.ogrDogTarih;
        ogr.ogrAdmin = d.ogrAdmin;
        ogr.ogrEmail = d.ogrEmail;
        ogr.ogrSifre = d.ogrSifre;


        this.apiServis.OgrenciDuzenle(ogr).subscribe(s => {
          this.alert.AlertUygula(s);
          if (s) {
            this.OgrenciListele();
          }
        });
      }
    });
  }
  OgrenciSil(ogr: Ogrenci) {
    this.confirmDialogRef = this.matDialog.open(ConfirmDialogComponent, {
      width: "550px",
      height: "190px"
    });
    this.confirmDialogRef.componentInstance.dialogMesaj = ogr.ogrAdsoyad + " isimli Öğrenci Silinecektir Onaylıyor musunuz?";
    { } this.confirmDialogRef.afterClosed().subscribe(d => {
      if (d) {
        this.apiServis.OgrenciSil(ogr.ogrId).subscribe(s => {
          this.alert.AlertUygula(s);
          if (s) {
            this.OgrenciListele();
          }
        });
      }
    });

  }

  FotoGuncelle(ogr: Ogrenci) {
    var yeniKayit = new Ogrenci();
    this.fotoDialogRef = this.matDialog.open(FotoDialogComponent, {
      width: "400px",
      data: ogr
    });

    this.fotoDialogRef.afterClosed().subscribe(d => {
      if (d) {
        d.ogrId = ogr.ogrId;
        this.apiServis.OgrFotoGuncelle(d).subscribe(s => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.OgrenciListele();
          }
        });
      }
    });
  }

  Filterele(e: any) {
    var deger = e.target.value;
    this.dataSource.filter = deger.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
