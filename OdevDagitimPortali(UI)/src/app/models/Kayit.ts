import { Odev } from "./Odev";
import { Ogrenci } from "./Ogrenci";
import { Ogretmen } from "./Ogretmen";

export class Kayit {
    kayitId: string;
    kayitOdevId: string;
    kayitOgrId: string;
    kayitOgretmenId: string;
    kayitTarih: string;
    kayitTeslimTarih: string;
    ogrBilgi: Ogrenci;
    odevBilgi: Odev;
    ogretmenBilgi: Ogretmen;
   
  }
