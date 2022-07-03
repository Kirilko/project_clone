<template>
  <v-container>
      <h1>{{teory.name}}</h1>
      <hr/>
      <vue-markdown :source="teory.info"/>
  </v-container>
</template>

<script>
import VueMarkdown from "vue-markdown-render";
import http from '../http';
export default {
  components: {
    VueMarkdown,
  },
  data() {
      return {
          teory: {
              info: ""
          }
      }
  },
  async beforeMount() {
      this.teory = (await http.getItem('TeoryInfo', this.$route.params.id, true)).data;
  }
};
</script>

<style>
</style>