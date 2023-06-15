import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OgrFoto } from 'src/app/models/OgrFoto';
import { Ogrenci } from 'src/app/models/Ogrenci';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-foto-dialog',
  templateUrl: './foto-dialog.component.html',
  styleUrls: ['./foto-dialog.component.css']
})
export class FotoDialogComponent implements OnInit {
  secilenFoto: any;
  ogrFoto: OgrFoto = new OgrFoto();
  secOgrenci: Ogrenci;

  ogrId = localStorage.getItem("uid") || '{}';


  constructor(
    public dialogRef: MatDialogRef<FotoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public apiServis: ApiService
  ) {
    this.secOgrenci = this.data;
  }

  ngOnInit() {
  }
  
  FotoSec(e: any) {
    var fotolar = e.target.files;
    var foto = fotolar[0];
    var fr = new FileReader();
    fr.onload = () => {
      if (fr.result !== null) {
        this.secilenFoto = fr.result;
        this.ogrFoto.fotoData = fr.result.toString();
        this.ogrFoto.fotoUzanti = foto.type;
      }
    }
    fr.readAsDataURL(foto);
  }

}
