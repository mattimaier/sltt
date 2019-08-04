<template>
    <div class="container" id="record-container">
        <b-button block variant="primary" @click="addRecord">Record New Time</b-button>
        <record-list></record-list>
    </div>
</template>

<script>
import RecordList from './RecordList'
import { store } from '../store.js'

export default {
    name: 'Record',
    methods: {
        addRecord: function() {
            store.addRecord()
        }
    },
    components: {
        "record-list": RecordList
    },
    created: function() {
        store.loadTopics()
    }
}
</script>

<style>
#record-container {
    padding-top: 1em;
}
</style>

