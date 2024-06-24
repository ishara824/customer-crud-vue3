<template>
  <div>
    <h2>Child Component</h2>
    <p>Message from Parent: {{ message }}</p>
    <p>Welcome to {{ currentYear }}</p>
  </div>
</template>

<script>
export default {
  name: 'ChildComponent',
  props: { // Define props
    message: {
      type: String, // prop data type Ex:- String, Number, Boolean
      required: true // required status
    },
    currentYear: {
      type: Number,
      required: true
    }
  }
};
</script>

<style scoped>
h2 {
  color: #35495e;
}
</style>
