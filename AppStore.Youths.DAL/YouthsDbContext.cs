using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data.Entity;
using AppStore.Youths.Model;
using System.Data.Entity.Infrastructure;
namespace AppStore.Youths.DAL
{
    public class YouthsDbContext:DbContext
    {
        /// <summary>
        /// 数据上下文
        /// <remarks>
        /// 创建：2014.11.14
        /// </remarks>
        /// </summary>
         public YouthsDbContext()
            : base("name=Youths_AppStore")
        {
            Database.CreateIfNotExists();
        }

         public virtual DbSet<App> App { get; set; }
         public virtual DbSet<AppClass> AppClass { get; set; }
         public virtual DbSet<AppComment> AppComment { get; set; }
         public virtual DbSet<AppScreenShot> AppScreenShot { get; set; }
         public virtual DbSet<AppTheme> AppTheme { get; set; }
         public virtual DbSet<AppThemeDetail> AppThemeDetail { get; set; }
         public virtual DbSet<AppType> AppType { get; set; }
         public virtual DbSet<BbsComment> BbsComment { get; set; }
         public virtual DbSet<BbsPlate> BbsPlate { get; set; }
         public virtual DbSet<BbsPost> BbsPost { get; set; }
         public virtual DbSet<BbsRepley> BbsRepley { get; set; }
         public virtual DbSet<Manager> Manager { get; set; }
         public virtual DbSet<User> User { get; set; }
    }
}
