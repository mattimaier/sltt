<template>
    <div class="container" id="report-container">

        <b-card v-for="report in reports" v-bind:key="report.title" bg-variant="dark" text-variant="white" class="report-card" :title="report.title">
            <b-card-text>{{report.description}}</b-card-text>
            <router-link v-if="report.isLink" :to="report.link"><b-button>Show Report</b-button></router-link>
            <b-button v-else @click="handleAction(report.methodName)">{{ report.actionName }}</b-button>
        </b-card>

    </div>
</template>

<script>
import { store } from '../store.js'

export default {
    name: "Reports",
    data: function() {
        return {
            reports: [
                {
                    title: "Total per Day",
                    description: "Total times for a day, total times for each topic that day",
                    isLink: true,
                    link: "/reports/daily-totals"
                },
                {
                    title: "Average per Topic",
                    description: "Average time spend on a topic over weeks",
                    isLink: true,
                    link: "/reports/avg-topic"
                },
                {
                    title: "Export to CSV",
                    description: "Export times to a CSV",
                    isLink: false,
                    methodName: "exportCsv",
                    actionName: "Create CSV"
                }
            ]
        }
    },
    methods: {
        handleAction: function(methodName) {
            this[methodName]();
        },
        exportCsv: function() {
            // local storage content to CSV
            var times = JSON.parse(localStorage.getItem("times"))
            if(times == null) {
                alert("No times present.")
                return
            }
            var rows = [
                // header
                ["start", "end", "topic", "comment"]
            ];
            for(var record_idx in times) {
                var record = times[record_idx]
                var topic = store.getTopicById(record.topic)
                rows.push([record.start, record.end, topic.name, record.comment])
            }
            let csvContent = "data:application/csv;charset=utf-8," + rows.map(e => e.join(",")).join("\n")

            // ship to browser
            var encodedUri = encodeURI(csvContent);
            window.open(encodedUri);
        }
    }
}
</script>

<style scoped>
#report-container {
    padding-top: 1em;
}
.report-card {
    margin-bottom: 1em;
}
</style>
