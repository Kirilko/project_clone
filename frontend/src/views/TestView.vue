<template>
  <v-container>
    <h1>{{ test.name }}</h1>
    <hr />
    <v-row v-for="(question, i) in this.test.data" :key="`${i}-question`">
      <v-col cols="12">
        <v-row>{{ question.title }}</v-row>
        <v-row>
          <v-col cols="12">
            <v-radio-group v-model="answers[i]">
              <v-radio
                v-for="(answer, j) in question.answers"
                :key="`${(j + i) * j}-answer`"
                :label="answer.title"
                :value="j"
              ></v-radio>
            </v-radio-group>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-btn :disabled='!isAllFiiled' color="primary" @click="endTest()">Завершить тестирование</v-btn>
  </v-container>
</template>

<script>
import http from "../http";

export default {
  data() {
    return {
      test: {
        data: [],
      },
      answers: {},
    };
  },
  async beforeMount() {
    this.test = (await http.getItem("Test", this.$route.params.id, true)).data;
  },
  computed: {
    isAllFiiled() {
      return this.test.data.length == Object.values(this.answers).length;
    },
  },
  methods: {
    async endTest(){
      console.log(Date())
      let answers = '';
      for (let i = 0; i < Object.keys(this.answers).length; i++){
        if(this.test.data[i].answers[this.answers[i]]){
          answers += this.test.data[i].answers[this.answers[i]].correct ? '+' : '-';
        } else answers += '-';

      }
      this.$store.dispatch("addItem", {
          data: {
            test: this.test.id,
            dttm_end: new Date(),
            answers: answers},
          url: "TestAttempt",
        })
      this.$router.replace({name: 'Test'});
    }
  }
};
</script>

<style>
</style>