<template>
    <h1 class="title">hello app</h1>
    <Home />
</template>

<script>
import Home from './views/Home'
export default {
    name: "App",
    components: {
        Home
    }
}
</script>

<style>
.title {
    color: pink;
}
</style> 