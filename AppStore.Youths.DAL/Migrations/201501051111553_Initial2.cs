namespace AppStore.Youths.DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Initial2 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.AppThemes", "AppThemeImg", c => c.String());
            DropColumn("dbo.AppThemes", "AppThemeThumb");
        }
        
        public override void Down()
        {
            AddColumn("dbo.AppThemes", "AppThemeThumb", c => c.String());
            DropColumn("dbo.AppThemes", "AppThemeImg");
        }
    }
}
