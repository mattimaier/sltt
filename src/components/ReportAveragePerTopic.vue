<template>
    <b-container>
        <h4>Average per Topic</h4>
        <!-- Filters -->
        <div>
            <b-input-group prepend="From" class="filter-field">
                <b-form-input v-model="filterDateFrom" type="date"></b-form-input>
            </b-input-group>
            <b-input-group prepend="To" class="filter-field">
                <b-form-input v-model="filterDateTo" type="date"></b-form-input>
            </b-input-group>
            <b-button block @click="compute" id="compute-button">Compute</b-button>
        </div>

        <!-- Results -->
        <b-table :items="averages"></b-table>
    </b-container>
</template>

<script>
import { store } from '../store.js'
import { getWeekNumber } from '../util.js'

export default {
    name: "ReportAveragePerTopic",
    data: function() {
        return {
            filterDateFrom: "",
            filterDateTo: "",
            averages: []
        }
    },
    methods: {
        compute: function() {
            // init variables
            var weekly_averages = {}

            // load topics
            store.loadTopics()
            var topics_init = {}
            for(var i in store.state.topics) {
                var topic = store.state.topics[i]
                topics_init[topic] = 0
            }

            // find weeks between from and to date
            var start_y, start_w = getWeekNumber(new Date(this.filterDateFrom))
            var end_y, end_w = getWeekNumber(new Date(this.filterDateTo))
            for(var y = start_y; y <= end_y; y++) {
                var w = 1;
                if(y == start_y) {
                    w = start_w
                }
                while(w <= 52 || (y == end_y && w <= end_w)) {
                    weekly_averages[y + "-" + w] = topics_init
                    w += 1;
                }
            }
            
            // TODO the actual computation

            // for each week, for each topic average the times - convert to output
            for(var week in weekly_averages) {
                var weekly_avg = weekly_averages[week]
                weekly_avg["week"] = week
                this.averages.push(weekly_avg)
            }
        }
    }
}
</script>

<style scoped>
 .filter-field {
     margin-bottom: 0.5em;
 }
</style>

