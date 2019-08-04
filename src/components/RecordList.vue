<template>
    <div>
        <b-card class="record-card" v-for="record in storeState.records" v-bind:key="record.id">
            <div slot="header">Record at {{record.start | datetimeFormat}}</div>

            <b-input-group prepend="Comment" class="mt-3">
                <b-form-input type="text" v-model="record.comment"></b-form-input>
            </b-input-group>
            <b-form-select prepend="Topic" v-model="record.topic" size="sm" class="mt-3">
                <option v-for="topic in storeState.topics" v-bind:key="topic.id" :value="topic.id">{{topic.name}}</option>
            </b-form-select>

            <div slot="footer">
                <b-button-group class="record-actions">
                    <b-button @click="removeRecord(record)" variant="secondary">Cancel</b-button>
                    <b-button @click="saveRecord(record)" variant="danger">Stop &amp; Save</b-button>
                </b-button-group>
            </div>
        </b-card>
    </div>
</template>

<script>
import { store } from '../store.js'
import { datetimeFormat } from '../util.js'

export default {
    name: "RecordList",
    data() {
        return {
            storeState: store.state
        }
    },
    methods: {
        removeRecord: function(record) {
            store.removeRecord(record)
        },
        saveRecord: function(record) {
            store.saveRecord(record)
        }
    },
    filters: {
        datetimeFormat: function(value) {
            return datetimeFormat(value)
        }
    }
}
</script>

<style scoped>
.record-card {
    margin-top: 0.6em;
    margin-bottom: 0.6em;
}

.record-card>.card-body {
    padding-top: 0;
}
.btn-group.record-actions {
  display: flex;
}

.record-actions .btn {
  flex: 1
}
</style>