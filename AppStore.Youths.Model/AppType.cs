//------------------------------------------------------------------------------
// <auto-generated>
//     此代码已从模板生成。
//
//     手动更改此文件可能导致应用程序出现意外的行为。
//     如果重新生成代码，将覆盖对此文件的手动更改。
// </auto-generated>
//------------------------------------------------------------------------------

namespace AppStore.Youths.Model
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations.Schema;
    
    public partial class AppType
    {
        public int Id { get; set; }
        public string AppTypeName { get; set; }
        public System.DateTime AddTime { get; set; }
        public System.DateTime UpdateTime { get; set; }

        [ForeignKey("AppTypeId")]
        public virtual ICollection<App> Apps { get; set; }
    }
}
