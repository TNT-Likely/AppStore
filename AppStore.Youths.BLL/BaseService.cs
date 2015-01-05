using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using AppStore.Youths.IBLL;
using AppStore.Youths.IDAL;
using AppStore.Youths.DAL;
using System.Linq.Expressions;

namespace AppStore.Youths.BLL
{
    /// <summary>
    /// 业务层基类
    /// <remarks>
    /// 创建：2014.11.14
    /// </remarks>
    /// </summary>
    /// <typeparam name="T"></typeparam>
    public class BaseService<T> : IBaseService<T> where T : class
    {
        protected IBaseRepository<T> CurrentRepository ;

        public BaseService()
        {
            CurrentRepository = new BaseRepository<T>();
        }

        /// <summary>
        /// 添加
        /// </summary>
        /// <param name="entity">实体对象</param>
        /// <returns>添加后的实体对象</returns>
        public T Add(T entity)
        {
            return CurrentRepository.Add(entity);
        }

        /// <summary>
        /// 查询记录数
        /// </summary>
        /// <param name="predicate">条件表达式</param>
        /// <returns>记录数</returns>
        public int Count(Expression<Func<T, bool>> predicate)
        {
            return CurrentRepository.Count(predicate);
        }

        /// <summary>
        /// 更新
        /// </summary>
        /// <param name="entity">实体对象</param>
        /// <returns>是否更新成功</returns>
        public bool Update(T entity)
        {
            return CurrentRepository.Update(entity);
        }

        /// <summary>
        /// 删除
        /// </summary>
        /// <param name="entity">实体对象</param>
        /// <returns>是否删除成功</returns>
        public bool Delete(T entity)
        {
            return CurrentRepository.Delete(entity);
        }

        /// <summary>
        /// 检查是否存在
        /// </summary>
        /// <param name="predicate">条件表达式</param>
        /// <returns>是否存在</returns>
        public bool Exist(Expression<Func<T, bool>> predicate)
        {
            return CurrentRepository.Exist(predicate);
        }

        /// <summary>
        /// 查询实体数据
        /// </summary>
        /// <param name="predicate">条件表达式</param>
        /// <returns>实体对象</returns>
        public T Find(Expression<Func<T, bool>> predicate)
        {
            return CurrentRepository.Find(predicate);
        }

        /// <summary>
        /// 查找数据列表
        /// </summary>
        /// <param name="wherePredicate">查询条件表达式</param>
        /// <param name="orderName">排序名称</param>
        /// <param name="isAsc">是否升序</param>
        /// <returns></returns>
        public IQueryable<T> FindList(Expression<Func<T, bool>> wherePredicate, string orderName, bool isAsc)
        {
            return CurrentRepository.FindList(wherePredicate, orderName, isAsc);
        }

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
        public IQueryable<T> FindPageList(int pageIndex, int pageSize, out int totalRecord, Expression<Func<T, bool>> wherePredicate, string orderName, bool isAsc)
        {
            return CurrentRepository.FindPageList(pageIndex, pageSize, out totalRecord, wherePredicate, orderName, isAsc);
        }

        #region 查询排序原始写法
        /// <summary>
        /// 查询数据列表
        /// </summary>
        /// <typeparam name="S">排序</typeparam>
        /// <param name="wherePredicate">查询条件表达式</param>
        /// <param name="isAsc">是否排序</param>
        /// <param name="orderPredicate">排序表达式</param>
        /// <returns></returns>
        public IQueryable<T> FindList<S>(Expression<Func<T, bool>> wherePredicate, bool isAsc, Expression<Func<T, S>> orderPredicate)
        {
            return CurrentRepository.FindList<S>(wherePredicate, isAsc, orderPredicate);
        }

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
        public IQueryable<T> FindPageList<S>(int pageIndex, int pageSize, out int totalRecord, Expression<Func<T, bool>> wherePredicate, bool isAsc, Expression<Func<T, S>> orderPredicate)
        {
            return CurrentRepository.FindPageList<S>(pageIndex, pageSize, out totalRecord, wherePredicate, isAsc, orderPredicate);
        }
        #endregion

    }
}
