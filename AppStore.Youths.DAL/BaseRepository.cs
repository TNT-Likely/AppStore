using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using AppStore.Youths.IDAL;

namespace AppStore.Youths.DAL
{
    /// <summary>
    /// 仓储基类
    /// <remarks>
    /// 创建：2014.11.14
    /// </remarks>
    /// </summary>
    /// <typeparam name="T"></typeparam>
    public class BaseRepository<T> : IBaseRepository<T> where T : class
    {
        protected YouthsDbContext nContext = ContextFactory.GetCurrentContext();
        public T Add(T entity)
        {
            nContext.Entry<T>(entity).State = System.Data.Entity.EntityState.Added;
            nContext.SaveChanges();
            return entity;
        }

        public int Count(Expression<Func<T, bool>> predicate)
        {
            return nContext.Set<T>().Count(predicate);
        }

        public bool Update(T entity)
        {
            nContext.Set<T>().Attach(entity);
            nContext.Entry<T>(entity).State = System.Data.Entity.EntityState.Modified;
            return nContext.SaveChanges() > 0;
        }

        public bool Delete(T entity)
        {
            nContext.Set<T>().Attach(entity);
            nContext.Entry<T>(entity).State = System.Data.Entity.EntityState.Deleted;
            return nContext.SaveChanges() > 0;
        }

        public bool Exist(Expression<Func<T, bool>> predicate)
        {
            return nContext.Set<T>().Any(predicate);
        }

        public T Find(Expression<Func<T, bool>> predicate)
        {
            return nContext.Set<T>().FirstOrDefault<T>(predicate);
        }

        public IQueryable<T> FindList(Expression<Func<T, bool>> wherePredicate, string orderName, bool isAsc)
        {
            var _list = nContext.Set<T>().Where<T>(wherePredicate);
            _list = OrderBy(_list, orderName, isAsc);
            return _list;
        }

        public IQueryable<T> FindPageList(int pageIndex, int pageSize, out int totalRecord, Expression<Func<T, bool>> wherePredicate, string orderName, bool isAsc)
        {
            var _list = nContext.Set<T>().Where<T>(wherePredicate);
            totalRecord = _list.Count();
            _list = OrderBy(_list, orderName, isAsc).Skip<T>((pageIndex - 1) * pageSize).Take<T>(pageSize);
            return _list;
        }

        /// <summary>
        /// 排序方法
        /// </summary>
        /// <param name="source">原IQueryable集合</param>
        /// <param name="propertyName">排序属性名</param>
        /// <param name="isAsc">是否升序</param>
        /// <returns>排序后的IQueryable集合</returns>
        private IQueryable<T> OrderBy(IQueryable<T> source, string propertyName, bool isAsc)
        {
            if (source == null)
            {
                throw new ArgumentNullException("source", "不能为空");
            }
            if (string.IsNullOrEmpty(propertyName))
            {
                return source;
            }
            var _parameter = Expression.Parameter(source.ElementType);
            var _property = Expression.Property(_parameter, propertyName);
            if (_property == null)
            {
                throw new ArgumentNullException("propertyName", "属性不存在");
            }
            var _lambda = Expression.Lambda(_property, _parameter);
            var _methodName = isAsc ? "OrderBy" : "OrderByDescending";
            var _resultExpression = Expression.Call(typeof(Queryable), _methodName, new Type[] { source.ElementType, _property.Type }, source.Expression, Expression.Quote(_lambda));
            return source.Provider.CreateQuery<T>(_resultExpression);
        }

        #region 查询排序原始写法
        public IQueryable<T> FindList<S>(Expression<Func<T, bool>> wherePredicate, bool isAsc, Expression<Func<T, S>> orderPredicate)
        {
            var _list = nContext.Set<T>().Where<T>(wherePredicate);
            if (isAsc)
            {
                _list.OrderBy<T, S>(orderPredicate);
            }
            else
            {
                _list.OrderByDescending<T, S>(orderPredicate);
            }
            return _list;
        }

        public IQueryable<T> FindPageList<S>(int pageIndex, int pageSize, out int totalRecord, Expression<Func<T, bool>> wherePredicate, bool isAsc, Expression<Func<T, S>> orderPredicate)
        {
            var _list = nContext.Set<T>().Where(wherePredicate);
            totalRecord = _list.Count();
            if (isAsc)
            {
                _list = _list.OrderBy<T, S>(orderPredicate).Skip<T>((pageIndex - 1) * pageSize).Take<T>(pageSize);
            }
            else
            {
                _list = _list.OrderByDescending<T, S>(orderPredicate).Skip<T>((pageIndex - 1) * pageSize).Take<T>(pageSize);
            }
            return _list;
        }
        #endregion
    }
}
