<template>
    <div>
        <b-navbar type="dark" variant="dark">
            <b-navbar-nav>
                <b-nav-item>
                    <router-link to="/record">Record</router-link>
                </b-nav-item>
                <b-nav-item>
                    <router-link to="/times">Times</router-link>
                </b-nav-item>
                <b-nav-item>
                    <router-link to="/topics">Topics</router-link>
                </b-nav-item>
                <b-nav-item>
                    <router-link to="/reports">Reports</router-link>
                </b-nav-item>
            </b-navbar-nav>
        </b-navbar>
    </div>
</template>

<script>
export default {
  name: 'Navbar'
}
</script>

<style scoped>
</style>
