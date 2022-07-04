<template>
  <div>
    <h2>Результаты прохождения тестов</h2>
    <v-expansion-panels>
      <v-expansion-panel v-for="(test, i) in this.tests" :key="i">
        <v-expansion-panel-header> {{test.test.name}} </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-data-table
            disable-sort
            class="elevation-1"
            :items="test.test.data"
            :headers="headers"
            hide-default-footer
          >
            <template v-slot:top>
              <v-row>
                <v-col>
                  <v-toolbar-title class="ml-5 mt-3"
                    >Результаты прохождения теста «Вводное тестирование»</v-toolbar-title
                  >
                </v-col>
              </v-row>
            </template>
          </v-data-table>
          <v-row>
            <v-col>Время прохождения: {{ test.dttm_end }}.</v-col>
          </v-row>
          <v-row
            ><v-col><b>Итого:</b></v-col
            ><v-col></v-col
            ><v-col><h4>{{(test.test.cnt/test.test.data.length)*100}}%</h4></v-col></v-row
          >
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
import http from "../http";

export default {
  async beforeMount() {
    this.tests = (await http.getList("TestAttempt")).data;
    for(let i = 0; i < Object.keys(this.tests).length; i++){
      this.tests[i].test = (await http.getItem("Test", this.tests[i].test, true)).data;
      let ans = Array.from(this.tests[i].answers);
      this.tests[i].test['cnt'] = 0;
      for (let j = 0; j<ans.length;j++){
        try {
          this.tests[i].test.data[j]['res'] = ans[j];
        }catch{continue}
        if(ans[j] === '+') {
          this.tests[i].test['cnt'] += 1
        }
      }

    }
  console.log(this.tests)

  },
  data() {
    return {
      tests: {
        data: [],
      },
      headers: [
        {
          text: "№ вопроса",
          value: "id",
        },
        {
          text: "Результат",
          value: "res",
        },
      ],
    };
  },
};
</script>

<style>
</style>