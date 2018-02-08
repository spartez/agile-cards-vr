<template>
    <a-scene>
        <a-assets>
            <img id="bg" src="../../img/360-2.jpg">
            <img id="cork" src="../../img/cork.jpg">
        </a-assets>
        <board position="0 0 -1.5" :board="board"></board>
        <!-- <a-sky  src="#bg" color="#ECECEC"></a-sky> -->
        <a-entity environment="preset: yavapai; dressingAmount: 500; skyColor: #ffffff"></a-entity>
    </a-scene>
</template>

<script>
import Board from './Board.vue';

export default {
    components: { Board },

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
    methods: {
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
