<template>
  <v-dialog
    v-model="show"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
    @click:outside="closeModal()"
  >
    <v-card>
      <v-toolbar dark color="primary">
        <v-btn icon dark @click="closeModal()">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title
          ><span class="text-h5">{{
            `${this.$route.params.id ? "Редактировать" : "Создать"} тест`
          }}</span></v-toolbar-title
        >
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn text @click="save()">
            {{ $route.params.id ? "Сохранить" : "Создать" }}
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card-text>
        <v-text-field
          v-model="test.name"
          label="Название"
          counter
          maxlength="512"
        ></v-text-field>
        <v-text-field
          v-model.number="test.max_attempts"
          label="Количество попыток экзамена"
          type="number"
        ></v-text-field>
        <h5>Задание</h5>
        <div>
          <v-expansion-panels>
            <v-expansion-panel
              v-for="(question, i) in test.data"
              :key="`${i}-question`"
            >
              <v-expansion-panel-header>
                <v-row>
                  <v-col cols="11">
                    <span>{{ question.title }}</span>
                  </v-col>
                  <v-col cols="1"
                    ><v-btn icon @click="deleteItem(i)">
                      <v-icon>delete</v-icon>
                    </v-btn></v-col
                  >
                </v-row>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-row>
                  <v-col
                    ><v-text-field
                      v-model="question.title"
                      label="Вопрос"
                    ></v-text-field></v-col
                ></v-row>
                <h6>Ответы</h6>
                <v-row
                  v-for="(answer, j) in question.answers"
                  :key="`${(j + i) * j}-answer`"
                >
                  <v-col cols="8">
                    <v-text-field
                      v-model="answer.title"
                      label="Ответ"
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col cols="4">
                    <v-checkbox
                      v-model="answer.correct"
                      label="Правильный"
                      dense
                    />
                  </v-col> </v-row
                ><v-row>
                  <v-col
                    ><v-btn
                      class="my-1"
                      fab
                      color="primary"
                      @click="addAnswer(i)"
                    >
                      <v-icon> mdi-plus </v-icon>
                    </v-btn></v-col
                  ></v-row
                >
              </v-expansion-panel-content></v-expansion-panel
            ></v-expansion-panels
          >
          <v-row>
            <v-col
              ><v-btn class="my-1" fab color="primary" @click="addItem()">
                <v-icon large> mdi-plus </v-icon>
              </v-btn></v-col
            >
          </v-row>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
import http from "../http";

export default {
  data() {
    return {
      show: true,
      test: {
        name: "",
        data: [],
        max_attempts: 1,
      },
    };
  },
  async beforeMount() {
    if (this.$route.params.id) {
      this.test = (
        await http.getItem("Test", this.$route.params.id, true)
      ).data;
    }
  },
  methods: {
    closeModal() {
      this.show = false;
      var q = { ...this.$route.query };
      this.$router.replace({
        name: "Test",
        query: q,
      });
    },
    addItem() {
      this.test.data.push({ id: this.test.data.length + 1, title: "", answers: [] });
    },
    deleteItem(i) {
      this.test.data.splice(i, 1);
    },
    addAnswer(i) {
      let question = this.test.data[i];
      question.answers = question.answers.map((v) => {
        return { title: v.title, correct: false };
      });
      question.answers.push({ title: "", correct: true });
      this.$set(this.test.data, i, question);
    },
    async save() {
      if (this.test.id) {
        await this.$store.dispatch("updateItem", {
          data: this.test,
          dataID: this.test.id,
          mutation: "setTests",
          url: "Test",
          items_name: "tests",
        });
      } else {
        await this.$store.dispatch("addItem", {
          data: this.test,
          mutation: "setTests",
          url: "Test",
          items_name: "tests",
        });
      }
      this.closeModal();
    },
  },
};
</script>
<style>
</style>