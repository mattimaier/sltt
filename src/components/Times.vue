<template>
    <div class="container" id="times-container">
        <!-- Filters -->
        <div>
            <b-input-group prepend="Date">
                <b-form-input v-model="filterDate" type="date"></b-form-input>
            </b-input-group>
            <b-form-select v-model="filterTopic" size="sm" class="mt-3">
                <option :value="null">[show all topics]</option>
                <option v-for="topic in storeState.topics" v-bind:key="topic.id" :value="topic.id">{{topic.name}}</option>
            </b-form-select>
            <b-button block @click="getTimes" id="show-times-button">Show Times</b-button>
        </div>

        <!-- Time display -->
        <b-list-group id="times-list" v-if="showTimes">
            <b-list-group-item v-for="record in times" v-bind:key="record.id" class="flex-column align-items-start">
                <div class="d-flex w-100 justify-content-between">
                    <span class="mb-1">{{record.start | datetimeFormat}} - {{record.end | datetimeFormat}}</span>
                    <small>{{duration(record)}}</small>
                </div>
                <div>
                    <b-badge variant="dark">{{ record.topic | resolveTopic}}</b-badge>
                </div>
                <div>
                    <small>{{record.comment}}</small>
                </div>
            </b-list-group-item>
        </b-list-group>
    </div>
</template>

<script>
import { store } from '../store.js'
import { datetimeFormat } from '../util.js'

export default {
    name: "Times",
    data: function() {
        return {
            storeState: store.state,
            times: [],
            filterDate: "",
            filterTopic: null,
            showTimes: false
        }
    },
    methods: {
        getTimes: function() {
            var times = JSON.parse(localStorage.getItem("times"))
            if(times == null) {
                times = []
            }
            var self = this
            times = times.filter(function(record) {
                // check date
                if(record.start.substring(0, 10) != self.filterDate) {
                    return false
                }
                // check topic
                if(self.filterTopic != null && record.topic != self.filterTopic) {
                    return false
                }
                return true
            })
            this.times = times
            this.showTimes = true
        },
        duration: function(record) {
            var start = new Date(record.start)
            var end = new Date(record.end)
            var delta = end - start
            var secs = delta / 1000
            if(secs < 60) {
                return Math.round(secs, 0) + "sec"
            }
            else if(secs < (60*60)) {
                return Math.round(secs / 60, 0) + "min"
            }
            else {
                return Math.round(secs / 60 / 24, 1) + "h"
            }
        }
    },
    created: function() {
        store.loadTopics()
    },
    filters: {
        resolveTopic: function(val) {
            var topic = store.getTopicById(val)
            return topic.name
        },
        datetimeFormat: function(val) {
            var d = new Date(val)
            var df = datetimeFormat(d)
            return df.substr(11, 5)
        }
    }
}
</script>

<style scoped>
#times-container {
    padding-top: 1em;
}
#times-list {
    margin-top: 1em;
}
#show-times-button {
    margin-top: 0.5em;
}
</style>
