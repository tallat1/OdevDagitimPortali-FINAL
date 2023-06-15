import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { Odev } from 'src/app/models/Odev';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { Kayit } from 'src/app/models/Kayit';
import { Ogrenci } from 'src/app/models/Ogrenci';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { OgrsecDialogComponent } from '../dialogs/ogrsec-dialog/ogrsec-dialog.component';

@Component({
  selector: 'app-ogrencilistele',
  templateUrl: './ogrencilistele.component.html',
  styleUrls: ['./ogrencilistele.component.css']
})
export class OgrencilisteleComponent implements OnInit {
  secOdev: Odev;
  odevId: string;
  ogretmenId: string;
  ogrId: string = "";
  kayitlar: Kayit[];
  dataSource: any;
  ogrenciler: Ogrenci[];
  displayedColumns = ['ogrNo', 'ogrAdsoyad', 'ogrDogTarih', 'islemler'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;
  ogrDialogRef: MatDialogRef<OgrsecDialogComponent>;

  constructor(
    public route: ActivatedRoute,
    public apiServis: ApiService,
    public alert: MyAlertService,
    public matDialog: MatDialog
  ) { }

  ngOnInit() {

    this.route.params.subscribe((p: any) => {
      if (p) {
        this.odevId = p.dersId;
        this.OdevGetir();
        this.KayitListele();
      }
    });
  }
  OdevGetir() {
    this.apiServis.OdevById(this.odevId).subscribe(d => {
      this.secOdev = d;
    });
  }
  KayitListele() {
    this.apiServis.OdevOgrenciListe(this.odevId).subscribe(d => {
      this.kayitlar = d;
      this.dataSource = new MatTableDataSource(this.kayitlar);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }
  KayitSil(kayit: Kayit) {
    this.confirmDialogRef = this.matDialog.open(ConfirmDialogComponent, {
      width: "400px"
    });
    this.confirmDialogRef.componentInstance.dialogMesaj = kayit.ogrBilgi.ogrAdsoyad + "Adlı Kişinin Kaydı Silinecektir Onaylıyor musunuz?";
    { } this.confirmDialogRef.afterClosed().subscribe(d => {
      if (d) {
        this.apiServis.KayitSil(kayit.kayitId).subscribe(s => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.KayitListele();
          }
        });
      }
    });
  }

  Ekle() {
    this.ogrDialogRef = this.matDialog.open(OgrsecDialogComponent, {
      width: "500px;"
    });

    this.ogrDialogRef.afterClosed().subscribe(d => {
      if (d) {
        var kayit = new Kayit();
        kayit.kayitOgrId = d.ogrId;
        kayit.kayitOdevId = this.odevId;
        kayit.kayitOgretmenId = this.ogretmenId;
        this.apiServis.KayitEkle(kayit).subscribe(s => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.KayitListele();
          }
        });

      }
    });

  }

}
