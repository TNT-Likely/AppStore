namespace AppStore.Youths.DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class InitialCreate : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Apps",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        AppName = c.String(),
                        AppPrice = c.String(),
                        AppImg = c.String(),
                        AppTypeId = c.Int(nullable: false),
                        AppClassId = c.Int(nullable: false),
                        AppIsFree = c.Boolean(),
                        AppIsNew = c.Boolean(),
                        AppIsRecommended = c.Boolean(),
                        AppDeveloper = c.String(),
                        AppVersion = c.String(),
                        AppDownload = c.Int(),
                        AppSize = c.String(),
                        AppIntroduce = c.String(),
                        AppDescribe = c.String(),
                        AddTime = c.DateTime(nullable: false),
                        UpdateTime = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.AppClasses",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        AppClassName = c.String(),
                        AppClassImg = c.String(),
                        AddTime = c.DateTime(nullable: false),
                        UpdateTime = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.AppComments",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        AppId = c.Int(),
                        UserId = c.Int(),
                        AppCommentDetail = c.String(),
                        AddTime = c.DateTime(nullable: false),
                        UpdateTime = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.AppScreenShots",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        AppId = c.Int(),
                        AppScreenShotUrl = c.String(),
                        AddTime = c.DateTime(nullable: false),
                        UpdateTime = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.AppThemes",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        AppThemeName = c.String(),
                        AppThemeDetail = c.String(),
                        AppThemeThumb = c.String(),
                        AddTime = c.DateTime(nullable: false),
                        UpdateTime = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.AppThemeDetails",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        AppId = c.Int(),
                        AppThemeId = c.Int(),
                        AddTime = c.DateTime(nullable: false),
                        UpdateTime = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.AppTypes",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        AppTypeName = c.String(),
                        AddTime = c.DateTime(nullable: false),
                        UpdateTime = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.BbsComments",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        UserId = c.Int(),
                        BbsPostId = c.Int(),
                        BbsCommentDetail = c.String(),
                        AddTime = c.DateTime(nullable: false),
                        UpdateTime = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.BbsPlates",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        BbsPlateName = c.String(),
                        BbsPlateDesribe = c.String(),
                        AddTime = c.DateTime(nullable: false),
                        UpdateTime = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.BbsPosts",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        UserId = c.Int(),
                        BbsPostTitle = c.String(),
                        BbsPostDetail = c.String(),
                        AddTime = c.DateTime(nullable: false),
                        UpdateTime = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.BbsRepleys",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        UserId = c.Int(),
                        BbsCommentId = c.Int(),
                        BbsRepleyDetail = c.String(),
                        AddTime = c.DateTime(nullable: false),
                        UpdateTime = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Managers",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        ManagerName = c.String(),
                        ManagerPassword = c.String(),
                        ManagerSex = c.Boolean(),
                        ManagerCall = c.String(),
                        AddTime = c.DateTime(nullable: false),
                        UpdateTime = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Users",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        UserName = c.String(),
                        UserPassword = c.String(),
                        UserAuthorUrl = c.String(),
                        UserCall = c.String(),
                        UserEmail = c.String(),
                        AddTime = c.DateTime(nullable: false),
                        UpdateTime = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.Users");
            DropTable("dbo.Managers");
            DropTable("dbo.BbsRepleys");
            DropTable("dbo.BbsPosts");
            DropTable("dbo.BbsPlates");
            DropTable("dbo.BbsComments");
            DropTable("dbo.AppTypes");
            DropTable("dbo.AppThemeDetails");
            DropTable("dbo.AppThemes");
            DropTable("dbo.AppScreenShots");
            DropTable("dbo.AppComments");
            DropTable("dbo.AppClasses");
            DropTable("dbo.Apps");
        }
    }
}
