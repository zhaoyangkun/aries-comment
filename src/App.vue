<template>
  <div id="app">
    <Comment
      :article_id="article_id"
      :page_id="page_id"
      :comment_type="comment_type"
    />
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      article_id: 2,
      page_id: 0,
      comment_type: 1,
    };
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
