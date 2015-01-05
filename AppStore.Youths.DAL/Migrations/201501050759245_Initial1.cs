namespace AppStore.Youths.DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Initial1 : DbMigration
    {
        public override void Up()
        {
            CreateIndex("dbo.Apps", "AppClassId");
            AddForeignKey("dbo.Apps", "AppClassId", "dbo.AppClasses", "Id", cascadeDelete: true);
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Apps", "AppClassId", "dbo.AppClasses");
            DropIndex("dbo.Apps", new[] { "AppClassId" });
        }
    }
}
