//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace odevportali.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class Ogretmen
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Ogretmen()
        {
            this.Kayit = new HashSet<Kayit>();
        }
    
        public string ogretmenId { get; set; }
        public string ogretmenAdSoyad { get; set; }
        public string ogretmenBolumu { get; set; }
    
        public virtual Ders Ders { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Kayit> Kayit { get; set; }
    }
}
