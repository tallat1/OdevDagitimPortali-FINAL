import { Component, Inject, OnInit } from '@angular/core';
import { OgrenciDialogComponent } from '../ogrenci-dialog/ogrenci-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Odev } from 'src/app/models/Odev';
import { Ders } from 'src/app/models/Ders';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-odev-dialog',
  templateUrl: './odev-dialog.component.html',
  styleUrls: ['./odev-dialog.component.css']
})
export class OdevDialogComponent implements OnInit {
  dialogBaslik: string;
  yeniKayit: Odev;
  islem: string;
  frm: FormGroup;

  dersId: string = "";
  dersler: Ders[];

  constructor(
    public apiServis: ApiService,
    public dialogRef: MatDialogRef<OgrenciDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public frmBuilder: FormBuilder
  ) {
    this.islem = data.islem;
    this.yeniKayit = data.kayit;
    if (this.islem == 'ekle') {
      this.dialogBaslik = "Yeni Ödev Ekle";
    }
    else {
      this.dialogBaslik = "Ödev Düzenle";
    }
    this.frm = this.FormOlustur();
  }

  ngOnInit() {
    this.DersListeGetir();
  }

  DersSec(d: string) {
    this.dersId = d;
  }

  DersListeGetir() {
    this.apiServis.DersListe().subscribe(d => {
      this.dersler = d;
    });
  }

 

  FormOlustur(): FormGroup {
    return this.frmBuilder.group({
      "odevAdi": [this.yeniKayit.odevAdi],
      "odevDersId": [this.yeniKayit.odevDersId]
    });
  }

}
