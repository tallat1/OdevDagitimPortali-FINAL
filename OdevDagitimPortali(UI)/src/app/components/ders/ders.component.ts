import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Ders } from 'src/app/models/Ders';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { DersDialogComponent } from '../dialogs/ders-dialog/ders-dialog.component';

var uyeYetkiler = localStorage.getItem("uyeYetkileri") || '{}';
var uyeYetkilerObjesi = JSON.parse(uyeYetkiler);

@Component({
  selector: 'app-ders',
  templateUrl: './ders.component.html',
  styleUrls: ['./ders.component.css']
})
export class DersComponent implements OnInit {

  admin = uyeYetkilerObjesi[0];

  dataSource: any;
  dersler: Ders[];
  displayedColumns = ['logo','dersKodu', 'dersAdi', 'dersKredi',  'islemler'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;
  dialogRef: MatDialogRef<DersDialogComponent>;

  constructor(
    public apiServis: ApiService,
    public matDialog: MatDialog,
    public alert: MyAlertService
  ) { }

  ngOnInit() {
    this.DersListele();
  }

  DersListele() {
    this.apiServis.DersListe().subscribe(d => {
      this.dersler = d;
      this.dataSource = new MatTableDataSource(d);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  DersEkle() {
    var yeniKayit = new Ders();
    this.dialogRef = this.matDialog.open(DersDialogComponent, {
      width: "550px",
      height: "370px",
      data: {
        islem: 'ekle',
        kayit: yeniKayit
      }
    });

    this.dialogRef.afterClosed().subscribe(d => {
      if (d) {
        d.ogrFoto = "profil.png";
        this.apiServis.DersEkle(d).subscribe(s => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.DersListele();
          }
        });
      }
    });
  }
  DersDuzenle(ders: Ders) {
    this.dialogRef = this.matDialog.open(DersDialogComponent, {
      width: "550px",
      height: "370px",
      data: {
        islem: 'duzenle',
        kayit: ders
      }
    });

    this.dialogRef.afterClosed().subscribe((d: Ders) => {
      if (d) {
        ders.dersAdi = d.dersAdi;
        ders.dersKodu = d.dersKodu;
        ders.dersKredi = d.dersKredi;
        
        this.apiServis.DersDuzenle(ders).subscribe(s => {
          this.alert.AlertUygula(s);
          if (s) {
            this.DersListele();
          }
        });
      }
    });
  }
  DersSil(ders: Ders) {
    this.confirmDialogRef = this.matDialog.open(ConfirmDialogComponent, {
      width: "550px",
      height: "190"
    });
    this.confirmDialogRef.componentInstance.dialogMesaj = ders.dersAdi + " isimli Ders Silinecektir Onaylıyor musunuz?";
    { } this.confirmDialogRef.afterClosed().subscribe(d => {
      if (d) {
        this.apiServis.DersSil(ders.dersId).subscribe(s => {
          this.alert.AlertUygula(s);
          if (s) {
            this.DersListele();
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
