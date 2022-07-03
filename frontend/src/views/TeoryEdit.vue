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
            `${
              this.$route.params.id ? "Редактировать" : "Создать"
            } теоритический материал`
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
          v-model="material.name"
          label="Название"
          counter
          maxlength="512"
        ></v-text-field>
        <v-row>
          <v-col cols="6">
            <v-textarea
              v-model="material.info"
              label="Материал в разметке markdown"
            ></v-textarea
          ></v-col>
          <v-col cols="6">
            <vue-markdown :source="material.info" />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
import http from "../http";
import VueMarkdown from "vue-markdown-render";

export default {
  components: {
    VueMarkdown,
  },
  data() {
    return {
      show: true,
      material: {
        name: "",
        info: "",
      },
    };
  },
  async beforeMount() {
    if (this.$route.params.id) {
      this.material = (
        await http.getItem("TeoryInfo", this.$route.params.id, true)
      ).data;
    }
  },
  methods: {
    closeModal() {
      this.show = false;
      var q = { ...this.$route.query };
      this.$router.replace({
        name: "TeoryInfo",
        query: q,
      });
    },
    async save() {
      if (this.material.id) {
        await this.$store.dispatch("updateItem", {
          data: this.material,
          dataID: this.material.id,
          mutation: "setTeoryInfos",
          url: "TeoryInfo",
          items_name: "teory_infos",
        });
      } else {
        await this.$store.dispatch("addItem", {
          data: this.material,
          mutation: "setTeoryInfos",
          url: "TeoryInfo",
          items_name: "teory_infos",
        });
      }
      this.closeModal();
    },
  },
};
</script>
<style>
</style>