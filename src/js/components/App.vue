<template>
  <div>
    <world></world>
  </div>
</template>

<script>
import World from './World.vue';

export default {
    components: { World },
    data: function() {
        return {};
    },

    mounted() {
        //fetch(`https://foo:bar@spartez.atlassian.net`)
    }
};
</script>

<style scoped>
h1 {
    font-size: 22px;
    color: red;
}
</style>
