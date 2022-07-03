<template>
  <div>
    <v-toolbar elevation="0">
      <v-toolbar-title>Теоритические материалы</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn
        text
        @click="$router.push({ name: 'TeoryCreate' })"
      >
        Создать
      </v-btn>
    </v-toolbar>
    <v-row>
      <v-col
        v-for="teory_info in $store.state.teory_infos"
        :key="teory_info.id"
      >
        <template>
          <v-card class="mx-auto" max-width="344">
            <v-card-text>
              <div>Теоритический материал</div>
              <p class="text-h4 text--primary">{{ teory_info.name }}</p>
              <p>
                Время чтения: ~{{
                  Math.round(teory_info.info.length / 1400) + 1
                }}
                мин.
              </p>
            </v-card-text>
            <v-card-actions>
              <v-btn
                text
                color="teal accent-4"
                @click="
                  $router.push({
                    name: 'TeoryView',
                    params: { id: teory_info.id },
                  })
                "
              >
                Читать
              </v-btn>
              <v-btn
                v-if="true"
                text
                color="blue accent-4"
                @click="
                  $router.push({
                    name: 'TeoryEdit',
                    params: { id: teory_info.id },
                  })
                "
              >
                Редактировать
              </v-btn>
              <v-btn
                text
                color="red accent-4"
                v-if="true"
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
    if (this.$store.state.teory_infos.length == 0) {
      await this.$store.dispatch("setTeoryInfos");
    }
  },
};
</script>

<style>
</style>