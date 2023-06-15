using odevportali.Models;
using odevportali.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace odevportali.Auth
{
    public class UyeService
    {
        DBodevEntities db = new DBodevEntities();

        public OgrenciModel UyeOturumAc(string kadi, string parola)
        {
            OgrenciModel uye = db.Ogrenci.Where(s => s.ogrEmail == kadi && s.ogrSifre == parola).Select(x => new OgrenciModel()
            {
                ogrId = x.ogrId,
                ogrNo = x.ogrNo,
                ogrAdsoyad = x.ogrAdsoyad,
                ogrDogTarih = x.ogrDogTarih,
                ogrFoto = x.ogrFoto,
                ogrAdmin = x.ogrAdmin,
                ogrEmail = x.ogrEmail,
                ogrSifre = x.ogrSifre

            }).SingleOrDefault();
            return uye;

        }
    }
}