<template>
    <a-entity :position="position" shadow>
        <a-box position="0 1.5 0" src="#cork" :width="boardSize.width" height="2" depth="0.05" rotation="0 0 0" color="#fff"></a-box>

        <a-box position="-1.5 1.5 0" width=".05" height="2" depth="0.1" rotation="0 0 0" color="#fff" roughness="1" metalness=".2"></a-box>
        <a-box position="1.5 1.5 0" width=".05" height="2" depth="0.1" rotation="0 0 0" color="#fff" roughness="1" metalness=".2"></a-box>
        <a-box position="0 2.5 0" width="3.05" height=".05" depth="0.1" rotation="0 0 0" color="#fff" roughness="1" metalness=".2"></a-box>
        <a-box position="0 .5 0" width="3.05" height=".05" depth="0.1" rotation="0 0 0" color="#fff" roughness="1" metalness=".2"></a-box>

        <a-cylinder position="-1.55 1.5 0" radius=".03" height=".1" rotation="0 0 90"></a-cylinder>
        <a-box position="-1.57 .8 0" width=".05" height="1.6" depth="0.1" rotation="0 0 0" color="#fff" roughness="1" metalness=".2"></a-box>
        <a-box position="-1.57 .03 0" width=".05" height=".06" depth="1" rotation="0 0 0" color="#fff" roughness="1" metalness=".2"></a-box>

        <a-cylinder position="1.55 1.5 0" radius=".03" height=".1" rotation="0 0 90"></a-cylinder>
        <a-box position="1.57 .8 0" width=".05" height="1.6" depth="0.1" rotation="0 0 0" color="#fff" roughness="1" metalness=".2"></a-box>
        <a-box position="1.57 .03 0" width=".05" height=".06" depth="1" rotation="0 0 0" color="#fff" roughness="1" metalness=".2"></a-box>

        <text-label :text="`Sprint goal: ${board.sprintGoal}`" width="2.5" height=".15" position="0 2.3 0.026" background="#fff" color="#000" ></text-label>

        <a-entity v-for="(column, index) in board.columns" :position="columnPosition(index)" :key="index">
            <text-label :text="column.name" width=".4" height=".1" background="#fff" color="#000" wrapCount="10"></text-label>
            <card v-for="(issue, cardIndex) in column.issues" :position="cardPosition(cardIndex)" :issue="issue" :key="cardIndex"></card>
        </a-entity>
    </a-entity>
</template>

<script>
import TextLabel from './TextLabel.vue';
import Card from './Card.vue';

const BOARD_WIDTH = 3;
const BOARD_HEIGHT = 2;

export default {
    components: {
        TextLabel, Card
    },

    props: {
        position: {
            type: String,
            default: '0 0 0'
        },
        board: Object,
        sprintName: String
    },

    data() {
        return {
            boardSize: {
                width: BOARD_WIDTH,
                height: BOARD_HEIGHT
            }
        }
    },

    computed: {
        columnsCount() {
            return this.board && this.board.columns && this.board.columns.length;
        },

        columnWidth() {
            return this.boardSize.width / this.columnsCount;
        }
    },

    methods: {
        columnXPosition(index) {
            return (index/this.columnsCount * this.boardSize.width) - (this.boardSize.width / 2) + this.columnWidth / 2;
        },

        columnPosition(index) {
            const x = this.columnXPosition(index);
            return `${x} 2 0.026`;
        },

        cardPosition(cardIndex) {
            const x = ((cardIndex % 2) * .4) - 0.2;
            const y = (Math.floor(cardIndex / 2) * -.4) -.5;
            return `${x} ${y} 0`;
        }
    }
};
</script>
