<template>
    <a-scene>
        <a-assets>
            <img id="bg" src="../../img/360-2.jpg">
            <img id="task" src="../../img/task.svg">
            <img id="story" src="../../img/story.svg">
            <img id="bug" src="../../img/bug.svg">
            <img id="defaultAvatar" src="../../img/default-avatar.png">
            <img id="cork" src="../../img/cork.jpg">
        </a-assets>
        <board position="0 0 -1.5" :board="board"></board>

        <a-entity environment="preset: yavapai; dressingAmount: 500; skyColor: #983827; lightPosition: 0 5 4; shadow: true; shadowSize: 10"></a-entity>
        <a-entity light="intensity:0.2; color:#fff" position="0 4.47 5.085"></a-entity>
        <a-camera :rotation="rotationVal"></a-camera>
        <a-light type="ambient" intensity="0.2"></a-light>
    </a-scene>
</template>

<script>
import Board from './Board.vue';
import Card from './Card.vue';
import { mapGetters } from 'vuex';

export default {
    components: { Board, Card },
    computed: {
      ...mapGetters(['board', 'rotation']),

      rotationVal() {
        return this.rotation;
      }
    }
};
</script>
