<template>
  <div>
    <h2>Результаты прохождения заданий</h2>
    <v-expansion-panels>
      <v-expansion-panel>
        <v-expansion-panel-header> Задание 1 </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-data-table
            disable-sort
            class="elevation-1"
            :items="data"
            :headers="headers"
            hide-default-footer
          >
            <template v-slot:top>
              <v-row>
                <v-col>
                  <v-toolbar-title class="ml-5 mt-3"
                    >Результаты прохождения задания 1</v-toolbar-title
                  >
                </v-col>
              </v-row>
            </template>
          </v-data-table>
          <v-row class="mt-3"><v-col>Кол-во залетов в беспилотные зоны: <b>1</b></v-col></v-row>
          <v-row
            ><v-col>Итоговая формула:</v-col
            ><v-col> 69 - (69 * 0.5 * 1) = </v-col
            ><v-col><h4>34,5</h4></v-col></v-row
          >
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        {
          text: "№ теста",
          value: "num",
        },
        {
          text: "max баллов",
          value: "max",
        },
        {
          text: "Коэффициент радиуса",
          value: "radius_coeff",
        },
        {
          text: "Коэффициент времени",
          value: "coeff_time",
        },
        {
          text: "Доп.коэффициенты",
          value: "add_coeff",
        },
        {
          text: "Итоговая формула",
          value: "formula",
        },
        {
          text: "Баллы",
          value: "points",
        },
      ],
      data: [
        {
          num: 1,
          max: 10,
          radius_coeff: "1 (Залетел в зону)",
          coeff_time: "1 (вовремя)",
          add_coeff: "-",
          formula: "10 * 1 * 1",
          points: 10,
        },
        {
          num: 2,
          max: 10,
          radius_coeff: "1 (Залетел в зону)",
          coeff_time: "0.5 (опаздал на 20 сек)",
          add_coeff: "-",
          formula: "10 * 1 * 0.5",
          points: 5,
        },
        {
          num: 3,
          max: 10,
          radius_coeff: "1 (Залетел в зону)",
          coeff_time: "1 (вовремя)",
          add_coeff: "1(Нажатие на кнопку)",
          formula: "10 * 1 * 1",
          points: 10,
        },
        {
          num: 4,
          max: 10,
          radius_coeff: "0.5 (Пролетел на 3 метра дальше зоны)",
          coeff_time: "1 (вовремя)",
          add_coeff: "-",
          formula: "10 * 0.5 * 1",
          points: 5,
        },
        {
          num: 5,
          max: 10,
          radius_coeff: "1 (Залетел в зону)",
          coeff_time: "1 (вовремя)",
          add_coeff: "-",
          formula: "10 * 1 * 1",
          points: 10,
        },
        {
          num: 5,
          max: 10,
          radius_coeff: "1 (Залетел в зону)",
          coeff_time: "1 (вовремя)",
          add_coeff: "-",
          formula: "10 * 1 * 1",
          points: 10,
        },
        {
          num: 6,
          max: 10,
          radius_coeff: "1 (Залетел в зону)",
          coeff_time: "1 (вовремя)",
          add_coeff: "-",
          formula: "10 * 1 * 1",
          points: 10,
        },
        {
          num: 7,
          max: 10,
          radius_coeff: "0.1 (Пролетел на 9 метров дальше зоны))",
          coeff_time: "1 (вовремя)",
          add_coeff: "1 (Нажатие на кнопку)",
          formula: "10 * 0.1 * 1",
          points: 1,
        },
        {
          num: 8,
          max: 10,
          radius_coeff: "1 (Залетел в зону)",
          coeff_time: "0.8 (опаздал на 10 сек)",
          add_coeff: "-",
          formula: "10 * 1 * 0.8",
          points: 8,
        },
        {
          num: 9,
          max: 10,
          radius_coeff: "1 (Залетел в зону)",
          coeff_time: "1 (вовремя)",
          add_coeff: "-",
          formula: "10 * 1 * 1",
          points: 10,
        },
      ],
    };
  },
};
</script>

<style>
</style>