import Vuex from 'vuex'
import http from './http'
import Vue from 'vue'

Vue.use(Vuex)


const store = new Vuex.Store({
    state: {
        user: false,
        isAuthenticated: false,
        tasks: [],
        levels: [],
        teory_infos: [],
        tests: [],
        task_attempts: [],
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
        },
        setAuthenticated(state, isAuthenticated) {
            state.isAuthenticated = isAuthenticated;
        },
        setTasks(state, tasks) {
            for (let task of tasks) {
                task.reveal = false;
            }
            state.tasks = tasks;
        },
        setLevels(state, levels) {
            state.levels = levels
        },
        setTeoryInfos(state, infos) {
            state.teory_infos = infos;
        },
        setTests(state, tests) {
            state.tests = tests;
        },
        setTaskAttempts(state, attempts) {
            state.task_attempts = attempts;
        }
    },
    actions: {
        async setTasks(context) {
            let response = (await http.getList('Task', {}, true)).data;
            context.commit('setTasks', response);
        },
        async setLevels(context) {
            let response = (await http.getList('Level', {}, true)).data;
            context.commit('setLevels', response);
        },
        async setTeoryInfos(context) {
            let response = (await http.getList('TeoryInfo', {}, true)).data;
            context.commit('setTeoryInfos', response);
        },
        async setTests(context) {
            let response = (await http.getList('Test', {}, true)).data;
            context.commit('setTests', response);
        },
        async setTaskAttempts(context) {
            let response = (await http.getList('TaskAttempt', {}, true)).data;
            context.commit('setTaskAttempts', response);
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
        async deleteItem(context, data) {
            let item_data = data.data
            let mutation = data.mutation;
            let dataID = data.id;
            let response = (await http.deleteItem(data.url, dataID, item_data, true)).data;
            let items = context.state[data.items_name]
            let index = items.findIndex(v => v.id == dataID);
            if (index != -1) {
                Vue.set(items, index, response);
            }
            context.commit(mutation, items);
        },
        async login(context, creds) {
            var username = creds.username;
            var password = creds.password;

            if (username == "admin" && password == "1234") {
                context.commit('setAuthenticated', true);
                context.commit('setUser', true);
            }
            if (username == "user1" && password == "1234"){
                context.commit('setAuthenticated', true);
                context.commit('setUser', false);
            }

        },
        async logout(context) {
            context.commit('setAuthenticated', false);
            context.commit('setUser', false);
        },
    }
})

export default store;
