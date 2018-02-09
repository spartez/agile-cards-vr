<template>
  <a-entity
    :position="position">
    <a-entity
      geometry="primitive: plane; height: 0.2; width: 0.2"
      :data-card-id="issue.id"
      @click="cardClicked"
      scale="1.5 1.5 1.5"
      :material="{color: 'white', opacity: 1}">
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

  export default {
    props: {
        position: String
    },
    data() {
      return {
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
            //return this.assignee.name;
        },
        assigneeAvatar() {
            //const avatarUrls = this.assignee.avatarUrls || {};
            //return `/api/image?url=${encodeURIComponent(avatarUrls['48x48'])}`;
        }
    },
    methods: {
    }

  }
</script>
