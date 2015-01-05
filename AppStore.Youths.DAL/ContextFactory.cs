using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Remoting.Messaging;
using System.Text;

namespace AppStore.Youths.DAL
{
    /// <summary>
    /// 上下文的简单工厂
    /// <remarks>
    /// 创建：2014.11.14
    /// </remarks>
    /// </summary>
    public class ContextFactory
    {
        /// <summary>
        /// 获取当前数据上下文
        /// </summary>
        /// <returns></returns>
        public static YouthsDbContext GetCurrentContext()
        {
            YouthsDbContext _context = CallContext.GetData("YouthsContext") as YouthsDbContext;
            if (_context == null)
            {
                _context = new YouthsDbContext();
                CallContext.SetData("YouthsContext", _context);
            }
            return _context;
        }
    }
}
