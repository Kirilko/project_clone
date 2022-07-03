<template>
  <div>
    <v-navigation-drawer
      permanent
      expand-on-hover
      clipped
      mini-variant
      app
      v-if="$store.state.isAuthenticated"
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
        <v-list-group prepend-icon="person">
          <template v-slot:activator>
            <v-list-item-title>Пользователь</v-list-item-title>
          </template>
          <v-list-item link :to="{name: 'Profile'}"
            ><v-list-item-icon>
              <v-icon>person</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Профиль</v-list-item-title>
            </v-list-item-content></v-list-item
          >
          <v-list-item @click="$store.dispatch('logout'); $router.replace({ name: 'login' });"
            ><v-list-item-icon>
              <v-icon>logout</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Выйти</v-list-item-title>
            </v-list-item-content></v-list-item
          >
        </v-list-group>
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