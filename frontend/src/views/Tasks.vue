<template>
  <div>
    <v-toolbar elevation="0">
      <v-toolbar-title>Задания</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-tooltip bottom color="primary">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            v-on="on"
            href="https://www.flightgear.org/download/"
            color="primary"
            class="mr-2"
          >
            Скачать симулятор
          </v-btn>
        </template>
        <span>Для обучения нужно скачать и установить себе симулятор</span>
      </v-tooltip>
      <v-tooltip bottom color="primary">
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs" v-on="on" href="/FoxAviaClient.zip" color="primary">
            Cкачать клиент
          </v-btn>
        </template>
        <span>Для обучения нужно скачать и установить себе клиент</span>
      </v-tooltip>

      <v-btn
        text
        v-if="$store.state.user.is_admin"
        @click="$router.push({ name: 'EditorCreate' })"
      >
        Создать
      </v-btn>
    </v-toolbar>
    <v-row>
      <v-col v-for="task in $store.state.tasks" :key="task.id">
        <template>
          <v-card class="mx-auto" max-width="344">
            <v-card-text>
              <div>Задание</div>
              <p class="text-h4 text--primary">{{ task.name }}</p>
              <p>Сложность: {{ task.level.name }}</p>
              <div class="text--primary">
                Максимальное количество попыток: {{ task.max_attempts }}
              </div>
              <div class="text--primary">
                Пройдено:
                {{
                  $store.state.task_attempts.findIndex(
                    (v) => v.task_id == task.id
                  ) != -1
                    ? "Да"
                    : "Нет"
                }}
                <p
                  v-if="
                    $store.state.task_attempts.findIndex(
                      (v) => v.task_id == task.id
                    ) != -1
                  "
                >
                  Результат:
                  {{
                    $store.state.task_attempts[
                      $store.state.task_attempts.findIndex(
                        (v) => v.task_id == task.id
                      )
                    ].score
                  }}
                  из 100
                </p>
              </div>
            </v-card-text>
            <v-card-actions>
              <v-btn text color="teal accent-4" @click="task.reveal = true">
                Подробнее
              </v-btn>
              <v-btn
                v-if="$store.state.user.is_admin"
                text
                color="blue accent-4"
                @click="
                  $router.push({ name: 'Editor', params: { id: task.id } })
                "
              >
                Редактировать
              </v-btn>
            </v-card-actions>

            <v-expand-transition mode="in-out">
              <v-card
                v-if="task.reveal"
                class="transition-fast-in-fast-out v-card--reveal"
                style="height: 100%"
              >
                <v-card-text class="pb-0">
                  <p class="text-h4 text--primary">{{ task.name }}</p>
                  <p>
                    {{ task.description }}
                  </p>
                </v-card-text>
                <v-card-actions class="pt-0">
                  <v-btn
                    text
                    color="teal accent-4"
                    @click="task.reveal = false"
                  >
                    Закрыть
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-expand-transition>
          </v-card>
        </template>
      </v-col>
    </v-row>
    <router-view />
  </div>
</template>

<script>
export default {
  async beforeMount() {
    if (this.$store.state.levels.length == 0) {
      await this.$store.dispatch("setLevels");
    }
    if (this.$store.state.tasks.length == 0) {
      await this.$store.dispatch("setTasks");
    }
    if (this.$store.state.task_attempts.length == 0) {
      await this.$store.dispatch("setTaskAttempts");
    }
  },
};
</script>

<style>
.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
}
</style>