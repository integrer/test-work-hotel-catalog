package com.nbibik.hotelcatalog.dao

import com.nbibik.hotelcatalog.entity.BaseEntity
import com.querydsl.core.types.dsl.EntityPathBase
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.querydsl.QuerydslPredicateExecutor
import org.springframework.data.querydsl.binding.QuerydslBinderCustomizer
import org.springframework.data.querydsl.binding.QuerydslBindings
import org.springframework.data.repository.NoRepositoryBean
import java.io.Serializable

@NoRepositoryBean
interface BaseRepository<TEntity : BaseEntity, TPath : EntityPathBase<TEntity>, TId : Serializable> :
    JpaRepository<TEntity, TId>, QuerydslPredicateExecutor<TEntity>, QuerydslBinderCustomizer<TPath> {
    @JvmDefault
    override fun customize(bindings: QuerydslBindings, root: TPath) {}
}
