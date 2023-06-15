import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Odev } from 'src/app/models/Odev';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { OdevDialogComponent } from '../dialogs/odev-dialog/odev-dialog.component';
import { Ders } from 'src/app/models/Ders';


var uyeYetkiler = localStorage.getItem("uyeYetkileri") || '{}';
var uyeYetkilerObjesi = JSON.parse(uyeYetkiler);

@Component({
  selector: 'app-odev',
  templateUrl: './odev.component.html',
  styleUrls: ['./odev.component.css']
})
export class OdevComponent implements OnInit {

  admin = uyeYetkilerObjesi[0];

  odevler: Odev[];
  dataSource: any;
  displayedColumns = ['logo','odevDersKodu', 'odevDersAdi', 'odevDersKredi', 'odevAdi', 'islemler'];
  confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dialogRef: MatDialogRef<OdevDialogComponent>; //odev-dialog

  constructor(
    public apiServis: ApiService,
    public matDialog: MatDialog,
    public alert: MyAlertService
  ) { }

  ngOnInit() {
    this.KayitGetir();

  }
  KayitGetir() {
    this.apiServis.OdevListe().subscribe(d => {
      this.odevler = d;
      this.dataSource = new MatTableDataSource(d);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }



  OdevEkle() {
    var yeniKayit: Odev = new Odev();
    this.dialogRef = this.matDialog.open(OdevDialogComponent, {
      width: "550px",
      height: "300px",
      data: {
        islem: 'ekle',
        kayit: yeniKayit
      }
    });

    this.dialogRef.afterClosed().subscribe(d => {
      if (d) {
        this.apiServis.OdevEkle(d).subscribe(s => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.KayitGetir();
          }
        });
      }
    });
  }
  OdevDuzenle(odev: Odev) {
    this.dialogRef = this.matDialog.open(OdevDialogComponent, {
      width: "550px",
      height: "300px",
      data: {
        islem: 'duzenle',
        kayit: odev
      }
    });
    this.dialogRef.afterClosed().subscribe(d => {
      if (d) {
        odev.odevAdi = d.odevAdi;
        odev.odevDersId = d.odevDersId;
        this.apiServis.OdevDuzenle(odev).subscribe(s => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.KayitGetir();
          }
        });
      }
    });

  }
  OdevSil(odev: Odev) {
    this.confirmDialogRef = this.matDialog.open(ConfirmDialogComponent, {
      width: "550px",
      height: "190px"
    });
    this.confirmDialogRef.componentInstance.dialogMesaj = odev.odevAdi + " Ödev Silinecektir Onaylıyor musunuz?";
    { } this.confirmDialogRef.afterClosed().subscribe(d => {
      if (d) {
        this.apiServis.OdevSil(odev.odevId).subscribe(s => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.KayitGetir();
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
