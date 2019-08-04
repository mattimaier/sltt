export const store = {
    debug: true,
    state: {
        records: [],
        topics: []
    },
    addRecord: function() {
        this.state.records.push({
            id: Date.now(),
            start: new Date(),
            end: null,
            comment: "",
            topic: ""
        })
        this.latestRecordId += 1
    },
    removeRecord: function(record) {
        this.state.records = this.state.records.filter(function(arr_rec) {
            return arr_rec.start != record.start
        })
    },
    saveRecord: function(record) {
        // set end date
        record.end = new Date()

        // store it in local storage
        var times = JSON.parse(localStorage.getItem("times"))
        if(times == null) {
            times = []
        }
        times.push(record)
        localStorage.setItem("times", JSON.stringify(times))

        // remove from list
        this.removeRecord(record)
    },
    addTopic: function(topic) {
        if(this.state.topics == null || typeof this.state.topics == "string") {
            this.state.topics = []
        }
        this.state.topics.push({
            id: Date.now(),
            name: topic,
            active: true
        })
        localStorage.setItem("topics", JSON.stringify(this.state.topics))
    },
    loadTopics: function() {
        var topics = JSON.parse(localStorage.getItem("topics"))
        this.state.topics = (topics == null) ? [] : topics
    },
    getTopicById: function(id) {
        return this.state.topics.find(t => t.id == id)
    }
}