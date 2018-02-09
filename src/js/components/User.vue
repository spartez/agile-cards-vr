<template>
  <a-entity
    :position="position" v-if="user" :rotation="rotation">
        <a-box width="0.5" depth="0.2" height="1.8" color="#ccc"></a-box>
        <a-image
          :src="assigneeAvatar"
          width="0.5"
          height="0.5"
          position="0 .5 -.1001"
        ></a-image>
      <!--<a-image
        :src="issueTypeIcon"
        width="0.02"
        height="0.02"
        position="-0.08 0.075 0.001"
      ></a-image>
      <a-image
        :src="assigneeAvatar"
        width="0.03"
        height="0.03"
        position="0.068 0.069 0.001"
      ></a-image>
      <a-text
        width="0.5"
        baseline="top"
        position="-0.065 0.081 0"
        color="black"
        :value="key">
      </a-text>
      <a-text
        position="-0.085 0.045 0"
        baseline="top"
        width="0.18"
        wrap-count="30"
        color="black"
        :value="`Priority: ${priority}`">
      </a-text>
      <a-text
        position="-0.085 0.035 0"
        baseline="top"
        width="0.18"
        wrap-count="30"
        color="black"
        :value="`Assignee: ${assignee}`">
      </a-text>
      <a-text
        position="-0.0855 0.015 0"
        baseline="top"
        width="0.18"
        wrap-count="25"
        color="black"
        :value="title">
      </a-text>
      <!-- <a-text
        position="-0.085 -0.015 0"
        baseline="top"
        width="0.18"
        wrap-count="35"
        color="black"
        :value="description">
      </a-text> -->
    </a-entity>
  </a-entity>
</template>

<script>
  import {mapActions} from 'vuex';
  import mnykiel from '../../img/mnykiel.jpg';
  import debone from '../../img/debone.jpg';
  import avatar from '../../img/default-avatar.png';

  export default {
    props: {
        position: String,
        user: Object,
    },
    data() {
      return {
          avatars: {
              mnykiel,
              debone
          }
        // id: 1,
        // key:"ACDC-199",
        // status: "bug",
        // assignee: "Victor Debone",
        // priority: "1",
        // title: "We cannot deliver so much in 24hrs, can we?",
        // description: "Select from one of A-Frame’s built-in fonts. These fonts will be loaded in from over a CDN. If you want your application to work better offline, download these fonts locally and point to them via a URL."
      }
    },
    computed: {
        assigneeName() {
            return this.user.userKey;
        },
        rotation() {
            if (!this.user.rotation) return '0 0 0';
            return `${this.user.rotation.x} ${this.user.rotation.y} ${this.user.rotation.z}`;
        },
        assigneeAvatar() {
            return this.avatars[this.assigneeName] || avatar;
            //const avatarUrls = this.assignee.avatarUrls || {};
            // return `/api/image?url=${encodeURIComponent(avatarUrls['48x48'])}`;
        }
    },
    methods: {
    }

  }
</script>
