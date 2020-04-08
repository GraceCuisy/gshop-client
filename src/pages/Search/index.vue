<template>
  <div>
    <TypeNav/>
    <h2>Search</h2>
    <p>query参数: keyword={{$route.query.keyword}}</p>
    <p>params参数: keyword={{$route.params.keyword}}</p>
    <p>props-query参数: keyword1={{keyword1}}</p>
    <p>props-params参数: keyword2={{keyword2}}</p>
  </div>
</template>

<script>
export default {
  name: 'Search',
  props:['keyword1','keyword2']
}
</script>

<style lang="less" scoped>

</style>
