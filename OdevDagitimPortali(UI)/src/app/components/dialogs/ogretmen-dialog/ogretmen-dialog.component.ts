import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Ders } from 'src/app/models/Ders';
import { Ogretmen } from 'src/app/models/Ogretmen';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-ogretmen-dialog',
  templateUrl: './ogretmen-dialog.component.html',
  styleUrls: ['./ogretmen-dialog.component.css']
})
export class OgretmenDialogComponent implements OnInit {
  dialogBaslik: string;
  yeniKayit: Ogretmen;
  islem: string;
  frm: FormGroup;

  dersId: string = "";
  dersler: Ders[];

  constructor(
    public apiServis: ApiService,
    public dialogRef: MatDialogRef<OgretmenDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public frmBuilder: FormBuilder
  ) {
    this.islem = data.islem;
    this.yeniKayit = data.kayit;
    if (this.islem == 'ekle') {
      this.dialogBaslik = "Yeni Öğretmen Ekle";
    }
    else {
      this.dialogBaslik = "Öğretmen Düzenle";
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
      "ogretmenAdSoyad": [this.yeniKayit.ogretmenAdSoyad],
      "ogretmenBolumu": [this.yeniKayit.ogretmenBolumu]
    });
  }

}
