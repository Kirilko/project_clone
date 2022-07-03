<template>
  <div>
    <v-navigation-drawer
      permanent
      expand-on-hover
      clipped
      mini-variant
      app
    >
      <v-list nav dense active-class="deep-purple--text text--accent-4">
        <v-list-item link :to="{name: 'TeoryInfo'}">
          <v-list-item-icon>
            <v-icon>description</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Теоритические материалы</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link :to="{name: 'Test'}">
          <v-list-item-icon>
            <v-icon>quiz</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Тесты</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app clipped-left>
      <v-app-bar-title>PolyEngineering</v-app-bar-title>
    </v-app-bar>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>