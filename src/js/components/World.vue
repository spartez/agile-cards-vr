<template>
    <a-scene cursor-card-listener @click.prevent="removePreviewCard">
        <a-assets>
            <img id="bg" src="../../img/360-2.jpg">
            <img id="task" src="../../img/task.svg">
            <img id="story" src="../../img/story.svg">
            <img id="bug" src="../../img/bug.svg">
            <img id="defaultAvatar" src="../../img/default-avatar.png">
            <img id="cork" src="../../img/cork.jpg">
        </a-assets>
        <board position="0 0 -1.5" :board="board"></board>
        <card  position="-1.1 1.75 -1.474"></card>
        <card position="-0.8 1.75 -1.474"></card>
        <card position="-0.8 1.45 -1.474"></card>
        
        <card position="-0.15 1.75 -1.474"></card>
        <card position="0.15 1.75 -1.474"></card>
        
        <card position="-1.1 1.75 -1.474"></card>
        <card position="-0.8 1.75 -1.474"></card>
        
        <a-entity environment="preset: yavapai; dressingAmount: 500; skyColor: #983827; lightPosition:0 5 4; shadow: true;shadowSize:10"></a-entity>
        <a-entity light="intensity:0.2; color:#fff" position="0 4.47 5.085"></a-entity>
        <a-camera user-height="0.4" :rotation="rotation">
          <card v-if="userCardPreview" position="-0.15 -0.07 -0.2"></card>
          <a-cursor>
            <a-animation begin="click" easing="ease-in" attribute="scale" dur="150"
               fill="forwards" from="0.1 0.1 0.1" to="1 1 1"></a-animation>
          </a-cursor>
        </a-camera>
        <a-light type="ambient" intensity="0.2"></a-light>
    </a-scene>
</template>

<script>
import '../../aframe/cursor-card-listener';

import { mapGetters, mapActions } from 'vuex';

import Board from './Board.vue';
import Card from './Card.vue';

export default {
    components: { Board, Card },
    data() {
        return {
            board: {
                sprintGoal: 'Virtual stand-ups!',
                columns: [
                    {
                        name: 'To-do'
                    },
                    {
                        name: 'In progress'
                    },
                    {
                        name: 'Done'
                    }
                ]
            }
        };
    },
    computed: {
      ...mapGetters(['userRotation', 'userCardPreview']),

      rotation() {
        return this.userRotation;
      }
    },
    methods: {
        ...mapActions(['cardPreview']),
        removePreviewCard(e) {
            if( e.target.nodeName !== "A-CURSOR" &&
                e.target.nodeName !== "CANVAS" && 
                !e.target.dataset.cardId ) {
                this.cardPreview(0);
            }
        },  
        randomColor() {
            const r = parseInt(Math.random() * 255);
            const g = parseInt(Math.random() * 255);
            const b = parseInt(Math.random() * 255);
            this.colorOfSphere = `rgb(${r},${g},${b})`;
        }
    },
    mounted() {
        setInterval(this.randomColor, 1000);
    }
};
</script>
