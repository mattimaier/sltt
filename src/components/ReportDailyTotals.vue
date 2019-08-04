<template>
    <b-container>
        <h4>Daily Totals</h4>
        <!-- Filters -->
        <div>
            <b-input-group prepend="Date">
                <b-form-input v-model="filterDate" type="date"></b-form-input>
            </b-input-group>
            <b-button block @click="compute" id="compute-button">Compute</b-button>
        </div>

        <!-- Results -->
        <b-table :items="totals"></b-table>
    </b-container>
</template>

<script>
import { store } from '../store.js'

export default {
    name: "ReportDailyTotals",
    data: function() {
        return {
            totals: [],
            filterDate: ""
        }
    },
    methods: {
        compute: function() {
            var totals = {}  // topic_id : sum
            var topicNames = {}  // topic_id : name
            var day = this.filterDate.substring(0, 10)
            
            // init totals with topics
            store.loadTopics()
            for(var i in store.state.topics) {
                var topic = store.state.topics[i]
                totals[topic.id] = 0
                topicNames[topic.id] = topic.name
            }
            totals[day] = 0
            topicNames[day] = day

            // load all data
            var times = JSON.parse(localStorage.getItem("times"))
            if(times == null) { return }

            // assign data to totals
            for(var idx in times) {
                var record = times[idx]
                // check date
                if(record.start.substring(0, 10) == this.filterDate) {
                    var duration = new Date(record.end) - new Date(record.start)
                    totals[record.topic] += duration
                    totals[day] += duration
                }
            }

            // convert it to a table format
            for(var id in totals) {
                this.totals.push({
                    "Topic": topicNames[id],
                    "Total [h]": Math.round(totals[id] / 1000 / 60 / 60, 2)
                })
            }
        }
    },
    created: function() {
        
    }
}
</script>

<style scoped>
#compute-button {
    margin-top: 0.5em;
    margin-bottom: 1em;
}
</style>


