using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;

namespace AppStore.Youths.IDAL
{
    public interface IBaseRepository<T>
    {
        /// <summary>
        /// 添加
        /// </summary>
        /// <param name="entity">实体对象</param>
        /// <returns>添加后的实体对象</returns>
        T Add(T entity);

        /// <summary>
        /// 查询记录数
        /// </summary>
        /// <param name="predicate">条件表达式</param>
        /// <returns>记录数</returns>
        int Count(Expression<Func<T, bool>> predicate);

        /// <summary>
        /// 更新
        /// </summary>
        /// <param name="entity">实体对象</param>
        /// <returns>是否更新成功</returns>
        bool Update(T entity);

        /// <summary>
        /// 删除
        /// </summary>
        /// <param name="entity">实体对象</param>
        /// <returns>是否删除成功</returns>
        bool Delete(T entity);

        /// <summary>
        /// 检查是否存在
        /// </summary>
        /// <param name="predicate">条件表达式</param>
        /// <returns>是否存在</returns>
        bool Exist(Expression<Func<T, bool>> predicate);

        /// <summary>
        /// 查询实体数据
        /// </summary>
        /// <param name="predicate">条件表达式</param>
        /// <returns>实体对象</returns>
        T Find(Expression<Func<T, bool>> predicate);

        /// <summary>
        /// 查找数据列表
        /// </summary>
        /// <param name="wherePredicate">查询条件表达式</param>
        /// <param name="orderName">排序名称</param>
        /// <param name="isAsc">是否升序</param>
        /// <returns></returns>
        IQueryable<T> FindList(Expression<Func<T, bool>> wherePredicate, string orderName, bool isAsc);

        /// <summary>
        /// 查询分页数据列表
        /// </summary>
        /// <param name="pageIndex">当前页数</param>
        /// <param name="pageSize">每页记录数</param>
        /// <param name="totalRecord">总记录数</param>
        /// <param name="wherePredicate">查询条件表达式</param>
        /// <param name="orderName">排序名称</param>
        /// <param name="isAsc">是否升序</param>
        /// <returns></returns>
        IQueryable<T> FindPageList(int pageIndex, int pageSize, out int totalRecord, Expression<Func<T, bool>> wherePredicate, string orderName, bool isAsc);

        #region 查询排序原始写法
        /// <summary>
        /// 查询数据列表
        /// </summary>
        /// <typeparam name="S">排序</typeparam>
        /// <param name="wherePredicate">查询条件表达式</param>
        /// <param name="isAsc">是否排序</param>
        /// <param name="orderPredicate">排序表达式</param>
        /// <returns></returns>
        IQueryable<T> FindList<S>(Expression<Func<T, bool>> wherePredicate, bool isAsc, Expression<Func<T, S>> orderPredicate);

        /// <summary>
        /// 查询分页数据列表
        /// </summary>
        /// <typeparam name="S">排序</typeparam>
        /// <param name="pageIndex">当前页</param>
        /// <param name="pageSize">每页记录数</param>
        /// <param name="totalRecord">总记录数</param>
        /// <param name="wherePredicate">查询条件表达式</param>
        /// <param name="isAsc">是否排序</param>
        /// <param name="orderPredicate">排序表达式</param>
        /// <returns></returns>
        IQueryable<T> FindPageList<S>(int pageIndex, int pageSize, out int totalRecord, Expression<Func<T, bool>> wherePredicate, bool isAsc, Expression<Func<T, S>> orderPredicate);
        #endregion
    }
}
