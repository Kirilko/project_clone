<template>
  <div>
    <v-toolbar elevation="0">
      <v-toolbar-title>Тесты</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn
        text
        v-if="$store.state.user"
        @click="$router.push({ name: 'TestCreate' })"
      >
        Создать
      </v-btn>
    </v-toolbar>
    <v-row>
      <v-col
        v-for="test in $store.state.tests"
        :key="test.id"
      >
        <template>
          <v-card class="mx-auto" max-width="347">
            <v-card-text>
              <div>Тест</div>
              <p class="text-h4 text--primary">{{ test.name }}</p>
            </v-card-text>
            <v-card-actions>
              <v-btn
                text
                color="teal accent-4"
                @click="
                  $router.push({
                    name: 'TestView',
                    params: { id: test.id },
                  })
                "
              >
                Пройти
              </v-btn>
              <v-btn
                v-if="$store.state.user"
                text
                color="blue accent-4"
                @click="
                  $router.push({
                    name: 'TestEdit',
                    params: { id: test.id },
                  })
                "
              >
                Редактировать
              </v-btn>
              <v-btn
                v-if="$store.state.user"
                text
                color="red accent-4"
                @click="deleteItem(test);"
              >
                Удалить
              </v-btn>
            </v-card-actions>
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
    if (this.$store.state.tests.length == 0) {
      await this.$store.dispatch("setTests");
    }
  },
  methods: {
    async deleteItem(data) {
        await this.$store.dispatch("deleteItem", {
          data: data,
          mutation: "setTests",
          url: "Test",
          items_name: "tests",
          id: data.id,
        });
        await this.$store.dispatch("setTests");
    },
  },
};
</script>

<style>
</style>