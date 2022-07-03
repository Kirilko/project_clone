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
            `${this.$route.params.id ? "Редактировать" : "Создать"} задание`
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
        <div>
          <!-- Сюда вставлять three js -->
        </div>
        <v-text-field
          v-model="task.name"
          label="Название"
          counter
          maxlength="512"
        ></v-text-field>
        <v-select
          item-text="name"
          item-value="id"
          label='Уровень сложности'
          :items="$store.state.levels"
          v-model="task.level_id"
          dense
        ></v-select>
        <v-text-field
          v-model.number="task.max_attempts"
          label="Количество попыток экзамена"
          type="number"
        ></v-text-field>
        <v-textarea v-model="task.description" label="Описание"></v-textarea>
        <h5>Задание</h5>
        <div>
          <v-expansion-panels>
            <v-expansion-panel v-for="(task, i) in task.task" :key="`${i}-task`">
              <v-expansion-panel-header>
                <v-row>
                  <v-col cols="11">
                    <span>{{
                      i +
                      1 +
                      ". " +
                      types[types.findIndex((v) => v.value == task.type)].name
                    }}</span>
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
                  <v-col>
                    <v-select
                      item-text="name"
                      item-value="value"
                      :items="types"
                      v-model="task.type"
                      dense
                    ></v-select>
                  </v-col>
                  <v-col>
                    <v-text-field
                      type="number"
                      v-model.number="task.x"
                      label="X"
                      dense
                    />
                  </v-col>
                  <v-col>
                    <v-text-field
                      type="number"
                      v-model.number="task.y"
                      label="Y"
                      dense
                  /></v-col>
                  <v-col>
                    <v-text-field
                      v-if="task.type != 'nofly_zone'"
                      type="number"
                      v-model.number="task.z"
                      label="Z"
                      dense
                  /></v-col>
                  <v-col>
                    <v-text-field
                      type="number"
                      v-model.number="task.к"
                      label="Радиус"
                      dense
                  /></v-col>
                  <v-col>
                    <v-text-field
                      v-if="task.type != 'nofly_zone'"
                      type="time"
                      v-modelr="task.t"
                      label="Время"
                      dense
                  /></v-col>
                  <v-col>
                    <v-text-field
                      v-if="task.type == 'waypoint_command'"
                      v-model="task.command"
                      label="Команда"
                      dense
                  /></v-col>
                </v-row> </v-expansion-panel-content></v-expansion-panel
          ></v-expansion-panels>
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
      types: [
        {
          name: "Пролететь точку с определённым радиусом (временем)",
          value: "waypoint",
        },
        {
          name: "Активировать какую-то кнопку",
          value: "waypoint_command",
        },
        {
          name: "Цилиндрическая зона, которую надо облететь",
          value: "nofly_zone",
        },
      ],
      show: true,
      task: {
        name: "",
        description: "",
        task: [],
        max_attempts: 1,
      },
    };
  },
  async beforeMount() {
    if (this.$route.params.id) {
      this.task = (
        await http.getItem("Task", this.$route.params.id, true)
      ).data;
    }
  },
  methods: {
    closeModal() {
      this.show = false;
      var q = { ...this.$route.query };
      this.$router.replace({
        name: "Task",
        query: q,
      });
    },
    addItem() {
      this.task.task.push({ type: "waypoint" });
    },
    deleteItem(i) {
      this.task.task.splice(i, 1);
    },
    async save() {
      if (this.task.id) {
        await this.$store.dispatch("updateItem", {
          data: this.task,
          dataID: this.task.id,
          mutation: "setTasks",
          url: "Task",
          items_name: "tasks",
        });
      } else {
        await this.$store.dispatch("addItem", {
          data: this.task,
          mutation: "setTasks",
          url: "Task",
          items_name: "tasks",
        });
      }
      this.closeModal();
    },
  },
};
</script>
<style>
</style>