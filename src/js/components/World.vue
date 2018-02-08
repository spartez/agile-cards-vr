<template>
    <a-scene>
        <a-assets>
            <img id="bg" src="../../img/360-2.jpg">
        </a-assets>
        <board></board>
        <!-- <a-sky  src="#bg" color="#ECECEC"></a-sky> -->
        <a-entity environment="preset: forest; numDressing: 500"></a-entity>
    </a-scene>
</template>

<script>
import Board from './Board.vue';

    export default {
        components: { Board },

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
