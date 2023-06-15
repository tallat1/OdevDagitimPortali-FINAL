import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Ders } from 'src/app/models/Ders';
import { Kayit } from 'src/app/models/Kayit';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { MatTableDataSource } from '@angular/material/table';
import { Odev } from 'src/app/models/Odev';

@Component({
  selector: 'app-odevlistebydersıd',
  templateUrl: './odevlistebydersıd.component.html',
  styleUrls: ['./odevlistebydersıd.component.css']
})
export class OdevlistebydersıdComponent implements OnInit {
  secDers: Ders;
  dersId: string;

  kayitlar: Kayit[];
  dersler: Ders[];
  odevler: Odev[];


  dataSource: any;
  displayedColumns = ['logo','odevDersAdi','odevAdi'];
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
    this.DersListeGetir();
    this.OdeListeGetir();
    this.route.params.subscribe((p: any) => {
      if (p) {
        this.dersId = p.dersId;
        this.DersGetir();
        this.OdevListByDersIdGetir();
      }
    });
  }

  DersGetir() {
    this.apiServis.DersById(this.dersId).subscribe(d => {
      this.secDers = d;
    });
  }


  OdevListByDersIdGetir() {
    this.apiServis.OdevListeByDersId(this.dersId).subscribe(d => {
      this.odevler = d;
      this.dataSource = new MatTableDataSource(d);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  DersSec(d: string) {
    this.dersId = d;
  }

  OdeListeGetir() {
    this.apiServis.OdevListe().subscribe(d => {
      this.odevler = d;
    });
  }
  DersListeGetir() {
    this.apiServis.DersListe().subscribe(d => {
      this.dersler = d;
    });
  }

}
