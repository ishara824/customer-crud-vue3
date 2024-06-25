<template>
    <div>
      <h1>Emit Parent Component</h1>
      <EmitChild @increaseBy="increaseByFunction"></EmitChild>
      <!-- The EmitChild component listens for the increaseBy event and triggers the increaseByFunction when the event is emitted. -->
      <!-- <EmitChild @increase-by.once="increaseBy"></EmitChild> -->
      <!-- increase-by.once -> When we use once executed function for once -->
    </div>
  </template>

  <script>
    import EmitChild from './EmitChild.vue';

    export default {
        name: 'EmitParent',
        components: {
            EmitChild
        },
        setup(){
            const increaseByFunction = (n) => {
                alert(n+1);
            }

            return{
                increaseByFunction
            }
        }

    };
  </script>

  <style scoped>
  h1 {
    color: #42b983;
  }
  </style>
