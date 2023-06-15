import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Odev } from 'src/app/models/Odev';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { Kayit } from 'src/app/models/Kayit';
import { MatTableDataSource } from '@angular/material/table';
import { Ogrenci } from 'src/app/models/Ogrenci';

@Component({
  selector: 'app-odevogrenciliste',
  templateUrl: './odevogrenciliste.component.html',
  styleUrls: ['./odevogrenciliste.component.css']
})
export class OdevogrencilisteComponent implements OnInit {
  secOdev: Odev;
  odevId: string;

  kayitlar: Kayit[];
  ogrenciler: Ogrenci[];
  odevler: Odev[];


  dataSource: any;
  displayedColumns = ['ogrFoto','ogrNo', 'ogrAdSoyad','ogrDogTarih','ogrOdevSayisi'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;

  constructor(
    public apiServis: ApiService,
    public route: ActivatedRoute,
    public alert: MyAlertService,
    public matDialog: MatDialog
  ) { }

  ngOnInit() {
    this.OgrenciListeGetir();
    this.OdeListeGetir();
    this.route.params.subscribe((p: any) => {
      if (p) {
        this.odevId = p.odevId;
        this.OdevGetir();
        this.OdevOgrenciListeGetir();
      }
    });
  }

  OdevGetir() {
    this.apiServis.OdevById(this.odevId).subscribe(d => {
      this.secOdev = d;
    });
  }

  OdevOgrenciListeGetir() {
    this.apiServis.OdevOgrenciListe(this.odevId).subscribe(d => {
      this.kayitlar = d;
      this.dataSource = new MatTableDataSource(d);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  OdevSec(d: string) {
    this.odevId = d;
  }

  OdeListeGetir() {
    this.apiServis.OdevListe().subscribe(d => {
      this.odevler = d;
    });
  }
  OgrenciListeGetir() {
    this.apiServis.OgrenciListe().subscribe(d => {
      this.ogrenciler = d;
    });
  }

}
