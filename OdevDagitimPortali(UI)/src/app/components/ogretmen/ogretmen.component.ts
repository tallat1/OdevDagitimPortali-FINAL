import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Ogretmen } from 'src/app/models/Ogretmen';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { MatTableDataSource } from '@angular/material/table';
import { OgretmenDialogComponent } from '../dialogs/ogretmen-dialog/ogretmen-dialog.component';

var uyeYetkiler = localStorage.getItem("uyeYetkileri") || '{}';
var uyeYetkilerObjesi = JSON.parse(uyeYetkiler);

@Component({
  selector: 'app-ogretmen',
  templateUrl: './ogretmen.component.html',
  styleUrls: ['./ogretmen.component.css']
})
export class OgretmenComponent implements OnInit {

  admin = uyeYetkilerObjesi[0];

  dataSource: any;
  ogretmenler: Ogretmen[];
  displayedColumns = ['ogretmenFoto', 'ogretmenAdsoyad', 'ogretmenBolumu', 'ogretmenBolumKodu', 'ogretmenVerOdevSayisi', 'islemler'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;
  dialogRef: MatDialogRef<OgretmenDialogComponent>;

  constructor(
    public apiServis: ApiService,
    public matDialog: MatDialog,
    public alert: MyAlertService
  ) { }

  ngOnInit() {
    this.OgretmenListele();
  }

  OgretmenListele() {
    this.apiServis.OgretmenListe().subscribe(d => {
      this.ogretmenler = d;
      this.dataSource = new MatTableDataSource(d);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  OgretmenEkle() {
    var yeniKayit = new Ogretmen();
    this.dialogRef = this.matDialog.open(OgretmenDialogComponent, {
      width: "550px",
      height: "290px",
      data: {
        islem: 'ekle',
        kayit: yeniKayit
      }
    });

    this.dialogRef.afterClosed().subscribe(d => {
      if (d) {
        d.ogrFoto = "profil.png";
        this.apiServis.OgretmenEkle(d).subscribe(s => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.OgretmenListele();
          }
        });
      }
    });
  }
  OgretmenDuzenle(ogretmen: Ogretmen) {
    this.dialogRef = this.matDialog.open(OgretmenDialogComponent, {
      width: "550px",
      height: "290px",
      data: {
        islem: 'duzenle',
        kayit: ogretmen
      }
    });

    this.dialogRef.afterClosed().subscribe((d: Ogretmen) => {
      if (d) {
        ogretmen.ogretmenAdSoyad = d.ogretmenAdSoyad;
        ogretmen.ogretmenBolumu = d.ogretmenBolumu;

        this.apiServis.OgretmenDuzenle(ogretmen).subscribe(s => {
          this.alert.AlertUygula(s);
          if (s) {
            this.OgretmenListele();
          }
        });
      }
    });
  }
  OgretmenSil(ogretmen: Ogretmen) {
    this.confirmDialogRef = this.matDialog.open(ConfirmDialogComponent, {
      width: "550px",
      height: "190px"
    });
    this.confirmDialogRef.componentInstance.dialogMesaj = ogretmen.ogretmenAdSoyad + " isimli Öğrenci Silinecektir Onaylıyor musunuz?";
    { } this.confirmDialogRef.afterClosed().subscribe(d => {
      if (d) {
        this.apiServis.OgretmenSil(ogretmen.ogretmenId).subscribe(s => {
          this.alert.AlertUygula(s);
          if (s) {
            this.OgretmenListele();
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
