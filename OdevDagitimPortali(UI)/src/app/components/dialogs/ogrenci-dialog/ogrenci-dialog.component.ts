import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Ogrenci } from 'src/app/models/Ogrenci';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDatepicker } from '@angular/material/datepicker';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
import { FormControl } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';


export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};


@Component({
  selector: 'app-ogrenci-dialog',
  templateUrl: './ogrenci-dialog.component.html',
  styleUrls: ['./ogrenci-dialog.component.css'],
})
export class OgrenciDialogComponent implements OnInit {


  dialogBaslik: string;
  yeniKayit: Ogrenci;
  islem: string;
  frm: FormGroup;




  constructor(

    public dialogRef: MatDialogRef<OgrenciDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public frmBuilder: FormBuilder
  ) {
    this.islem = data.islem;
    this.yeniKayit = data.kayit;
    if (this.islem == 'ekle') {
      this.dialogBaslik = "Yeni Öğrenci Ekle";
    }
    else {
      this.dialogBaslik = "Öğrenci Düzenle";
    }
    this.frm = this.FormOlustur();
  }

  ngOnInit() {
  }

  FormOlustur(): FormGroup {
    return this.frmBuilder.group({
      "ogrNo": [this.yeniKayit.ogrNo],
      "ogrAdsoyad": [this.yeniKayit.ogrAdsoyad],
      "ogrDogTarih": [this.yeniKayit.ogrDogTarih],
      "ogrAdmin": [this.yeniKayit.ogrAdmin],
      "ogrEmail": [this.yeniKayit.ogrEmail],
      "ogrSifre": [this.yeniKayit.ogrSifre]
    });
  }



}
