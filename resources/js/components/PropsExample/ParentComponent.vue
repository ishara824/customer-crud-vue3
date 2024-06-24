<template>
  <div>
    <h1>Parent Component</h1>
    <ChildComponent message="Hello from Parent!" v-bind:currentYear="2024"/>
  </div>
</template>

<script>
import ChildComponent from './ChildComponent.vue';

export default {
  name: 'ParentComponent',
  components: {
    ChildComponent
  }
};
</script>

<style scoped>
h1 {
  color: #42b983;
}
</style>
