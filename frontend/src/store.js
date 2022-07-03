import Vuex from 'vuex'
import http from './http'
import Axios from 'axios'
import Vue from 'vue'

Vue.use(Vuex)


const store = new Vuex.Store({
    state: {
        isAuthenticated: false,
        teory_infos: [],
        tests: [],
        task_attempts: [],
    },
    mutations: {
        setTeoryInfos(state, infos) {
            state.teory_infos = infos;
        },
        setTests(state, tests) {
            state.tests = tests;
        },
    },
    actions: {
        async setTeoryInfos(context) {
            let response = (await http.getList('TeoryInfo', {}, true)).data;
            context.commit('setTeoryInfos', response);
        },
        async setTests(context) {
            let response = (await http.getList('Test', {}, true)).data;
            context.commit('setTests', response);
        },
        async addItem(context, data) {
            let item_data = data.data
            let mutation = data.mutation;
            let response = (await http.createItem(data.url, item_data, true)).data;
            let items = context.state[data.items_name]
            items.push(response);
            context.commit(mutation, items);
        },
        async updateItem(context, data) {
            let item_data = data.data
            let mutation = data.mutation;
            let dataID = data.dataID;
            let response = (await http.updateItem(data.url, dataID, item_data, true)).data;
            let items = context.state[data.items_name]
            let index = items.findIndex(v => v.id == dataID);
            if (index != -1) {
                Vue.set(items, index, response);
            }
            context.commit(mutation, items);
        },
        async login(context) {
            var status = false;
            try {
                status = true;
            } catch (error) {
                var data = error.response.data;
                if (data.non_field_errors) {
                    Vue.showErrorModal(data.non_field_errors);
                } else {
                    var result = '';
                    for (var k in data) {
                        result += `${k}: ${data[k]}\n`
                    }
                    Vue.showErrorModal(result);
                }
            }
            await context.dispatch('checkAuth');
            return status;
        },
        async logout(context) {
            await Axios.post("/rest_api/auth/logout/", {}, { headers: { 'X-CSRFToken': Vue.$cookies.get('csrftoken') } });
            context.commit('setAuthenticated', false);
            context.commit('setUser', {});
        },
        async checkAuth(context) {
            try {
                var result = await Axios.get("/rest_api/auth/user/");
                if (result.status != 200) {
                    context.commit('setUser', {});
                    return
                }
                context.commit('setAuthenticated', true);
                context.commit('setUser', result.data);
            } catch (e) {
                context.commit('setUser', {});
            }
        },
    }
})

export default store;
