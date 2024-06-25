<template>
    <div>
      <h1>Emit Child Component</h1>
      <button class="btn btn-primary" @click="$emit('increaseBy',4)">Click me</button>
    </div>
</template>

<script>
    export default {
        name: 'EmitChild'
    };
</script>

<style scoped>
    h1 {
    color: black;
    }
</style>
