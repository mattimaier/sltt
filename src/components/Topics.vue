<template>
    <div class="container" id="topics-container">

        <!-- Add Topics -->
        <div>
            <b-input-group prepend="Topic">
                <b-form-input v-model="topic"></b-form-input>
                <b-input-group-append>
                    <b-button @click="addTopic">+</b-button>
                </b-input-group-append>
            </b-input-group>
        </div>

        <!-- Show topics -->
        <b-list-group id="topics-list">
            <b-list-group-item v-for="topic in storeState.topics" v-bind:key="topic.id">{{ topic.name }}</b-list-group-item>
        </b-list-group>

    </div>
</template>

<script>
import { store } from '../store.js'

export default {
    name: "Topics",
    data: function() {
        return {
            storeState: store.state,
            topic: ""
        }
    },
    methods: {
        addTopic: function() {
            store.addTopic(this.topic)
        }
    },
    created: function() {
        store.loadTopics()
    }
}
</script>

<style scoped>
#topics-container {
    padding-top: 1em;
}
#topics-list {
    margin-top: 1em;
}
</style>
