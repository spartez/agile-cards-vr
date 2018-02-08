<template>
    <a-scene>
        <a-assets>
            <a-asset-item id="optimerBoldFont" src="src/fonts/helvetiker_regular.typeface.json"></a-asset-item>
            <img id="bg" src="../../img/360-2.jpg">
            <img id="task" src="../../img/task.svg">
            <img id="story" src="../../img/story.svg">
            <img id="bug" src="../../img/bug.svg">
            <img id="defaultAvatar" src="../../img/default-avatar.png">
            <img id="cork" src="../../img/cork.jpg">
        </a-assets>
        <board position="0 0 -1.5" :board="board"></board>
        <card position="-1.1 1.75 -1.474"></card>
        <card position="-0.8 1.75 -1.474"></card>
        <card position="-0.8 1.45 -1.474"></card>
        
        <card position="-0.15 1.75 -1.474"></card>
        <card position="0.15 1.75 -1.474"></card>
        
        <card position="-1.1 1.75 -1.474"></card>
        <card position="-0.8 1.75 -1.474"></card>
        
        <card position="0 1 -2" rotation="-90 0 0"></card>
        <!-- <a-sky  src="#bg" color="#ECECEC"></a-sky> -->
        <a-entity environment="preset: yavapai; dressingAmount: 500; skyColor: #983827; lightPosition:0 10 0; shadow:true; shadowSize:20"></a-entity>
        <a-entity light="type:directional; position:0 -5 0; color:#fff; intesity:0.8; castShadow: true"></a-entity>
        <a-camera rotation="15 45 0"></a-camera>
    </a-scene>
</template>

<script>
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
