<template>
    <a-scene cursor-card-listener @click.prevent="removePreviewCard">
        <a-assets>
            <img id="bg" src="../../img/360-2.jpg">
            <img id="task" src="../../img/task.svg">
            <img id="story" src="../../img/story.svg">
            <img id="bug" src="../../img/bug.svg">
            <img id="defaultAvatar" src="../../img/default-avatar.png">
            <img id="cork" src="../../img/cork.jpg">
            <a-asset-item id="samu-obj" :src="samuobj"></a-asset-item>
            <a-asset-item id="samu-mtl" :src="samumtl"></a-asset-item>
        </a-assets>
        <board position="0 0 -1.5" :board="board"></board>
        <a-entity position="1.941 0 -0.941" scale="0.3 0.3 0.3" rotation="0 -45 0" obj-model="obj: #samu-obj; mtl: #samu-mtl"></a-entity>

        <user v-for="(user, index) in otherUsers" :position="`${positions[index]} .9 0`" :user="user"></user>
        <!-- <user :position="`1 .9 0`" :user="users['mnykiel']"></user> -->

        <a-entity environment="preset: yavapai; dressingAmount: 500; skyColor: #983827; lightPosition: 0 5 4; shadow: true; shadowSize: 10"></a-entity>
        <a-entity light="intensity:0.2; color:#fff" position="0 4.47 5.085"></a-entity>
        <a-camera user-height="1.6" :rotation="rotation" @componentchanged="cameraChange">
          <card
            v-if="isCardPreview"
            position="0 -0.15 -0.31"
            rotation="-19.92 0 0"
            :issue="currentCardPreview"
          ></card>
          <a-cursor>
            <a-animation begin="click" easing="ease-in" attribute="scale" dur="150"
               fill="forwards" from="0.1 0.1 0.1" to="1 1 1"></a-animation>
          </a-cursor>
        </a-camera>
        <a-light type="ambient" intensity="0.2"></a-light>
    </a-scene>
</template>

<script>

import samuobj from "../../img/sonjen-daimyo.obj";
import samumtl from "../../img/sonjen-daimyo.mtl";
import diff from "../../img/diff.png";

import { mapGetters, mapMutations, mapActions } from 'vuex';

import Board from './Board.vue';
import Card from './Card.vue';
import User from './User.vue';

export default {
    components: { Board, Card, User },
    data() {
      return {
        samuobj,
        samumtl,
        positions: [1, -1, 2, -2, 3, -3]
      }
    },
    computed: {
      ...mapGetters(['board', 'isCardPreview', 'currentCardPreview', 'users', 'userKey']),

      otherUsers() {
          const others = Object.keys(this.users).filter(key => key !== this.userKey).map(key => this.users[key]);
          console.log(others);
          return others;
      },

      rotation() {
        return "0 0 0";//this.userRotation;
      }
    },
    methods: {
        ...mapMutations(['removeCardPreview']),
        ...mapActions(['updateRotation']),
        cameraChange(e) {
            if (e.detail.name !== 'rotation') { return; }
            const rotation = e.target.getAttribute('rotation');
            this.updateRotation(rotation);
        },
        removePreviewCard(e) {
            if( e.target.nodeName !== "A-CURSOR" &&
                e.target.nodeName !== "CANVAS" &&
                !e.target.dataset.cardId ) {
                this.removeCardPreview();
            }
        }
    }
};
</script>
