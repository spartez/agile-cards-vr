<template>
    <a-scene>
        <a-assets>
            <a-asset-item id="optimerBoldFont" src="src/fonts/helvetiker_regular.typeface.json"></a-asset-item>
            <img id="bg" src="../../img/360-2.jpg">
            <img id="task" src="../../img/task.svg">
            <img id="story" src="../../img/story.svg">
            <img id="bug" src="../../img/bug.svg">
            <img id="defaultAvatar" src="../../img/default-avatar.png">
        </a-assets>
        <a-entity position="10 0 0">
            <board> </board>
            <a-entity rotation="0 180 0">
                <a-camera look-controls>
                    <card></card>
                </a-camera>
            </a-entity>
            <!-- <a-sky  src="#bg" color="#ECECEC"></a-sky> -->
        </a-entity>
        <a-entity environment="preset: forest; numDressing: 500"></a-entity>
        <a-entity light="type: ambient; color: #FFF"></a-entity>
    </a-scene>
</template>

<script>
import Board from './Board.vue';
import Card from './Card.vue';

    export default {
        components: { Board, Card },

        data() {
            return {
                colorOfSphere: "#123456"
            }
        },
        methods: {
            randomColor() {
                const r = parseInt(Math.random() * 255);
                const g = parseInt(Math.random() * 255);
                const b = parseInt(Math.random() * 255);
                this.colorOfSphere = `rgb(${r},${g},${b})`;
            }
        },
        mounted(){
            setInterval(this.randomColor, 1000);
        }
    };
</script>
