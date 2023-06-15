import { Component, OnInit, ViewChild } from '@angular/core';
import { Sonuc } from 'src/app/models/Sonuc';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { ApiService } from 'src/app/services/api.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { OgrenciDialogComponent } from '../dialogs/ogrenci-dialog/ogrenci-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { Kayit } from 'src/app/models/Kayit';
import { Odev } from 'src/app/models/Odev';
import { Ders } from 'src/app/models/Ders';
import { Ogretmen } from 'src/app/models/Ogretmen';
import { FotoDialogComponent } from '../dialogs/foto-dialog/foto-dialog.component';
import { Ogrenci } from 'src/app/models/Ogrenci';
import { OgrFoto } from 'src/app/models/OgrFoto';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  ogrId = localStorage.getItem("uid") || '{}';


  dataSource: any;
  displayedColumns = ['done','ogretmenAdSoyad', 'odevDersAdi', 'odevAdi', 'kayitTarih','kayitTeslimTarih', 'islemler'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;
  dialogRef: MatDialogRef<OgrenciDialogComponent>;
  fotoDialogRef: MatDialogRef<FotoDialogComponent>;


  kadi: string;
  secOgrId: string;
  uyeYetkileri: string;


  kayitlar: Kayit[];
  ogrenciler: Ogrenci[];

  constructor(
    public alert: MyAlertService,
    public matDialog: MatDialog,
    public apiServis: ApiService,
  ) { }

  ngOnInit(): void {
    this.OgrenciListele();
    this.OgrenciOdevListele();
    if (this.apiServis.oturumKontrol()) {
      this.kadi = localStorage.getItem("kadi") || '{}';
      this.secOgrId = localStorage.getItem("uid") || '{}';
      this.uyeYetkileri = localStorage.getItem("uyeYetkileri") || '{}';
    }
  }



  OgrenciOdevListele() {
    this.apiServis.OgrenciOdevListe(this.ogrId).subscribe(d => {
      this.kayitlar = d;
      this.dataSource = new MatTableDataSource(d);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
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






  OgrenciListele() {
    this.apiServis.OgrenciListe().subscribe(d => {
      this.ogrenciler = d;
      this.dataSource = new MatTableDataSource(d);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
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
