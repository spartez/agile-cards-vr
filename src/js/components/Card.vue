<template>
  <a-entity
    :position="position">
    <a-entity 
      geometry="primitive: plane; height: 0.2; width: 0.2"
      :data-card-id="id"
      @click="cardClicked"
      :material="{color: 'white', opacity: 1}">
      <a-image
        :src="`#${status}`"
        width="0.01"
        height="0.01"
        position="-0.07 0.069 0.01"
      ></a-image>
      <a-image
        src="#defaultAvatar"
        width="0.02"
        height="0.02"
        position="0.068 0.069 0.01"
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
        position="-0.085 0.015 0"
        baseline="top"
        width="0.18"
        wrap-count="30"
        color="black"
        :value="title">
      </a-text>
      <a-text  
        position="-0.0855 0.015 0"
        baseline="top"
        width="0.18"
        wrap-count="30"
        color="black"
        :value="title">
      </a-text>
      <a-text  
        position="-0.085 -0.015 0"
        baseline="top"
        width="0.18"
        wrap-count="35"
        color="black"
        :value="description">
      </a-text>
    </a-entity>
  </a-entity>
</template>

<script>
  import {mapActions} from 'vuex';
  
  
  
  export default {
    props: [ 'position' ],
    data() {
      return {
        id: 1,
        key:'ACDC-199',
        status: 'bug',
        assignee: 'Victor Debone',
        priority: '1',
        title: 'We cannot deliver so much in 24hrs, can we?',
        description: 'Select from one of A-Frame’s built-in fonts. These fonts will be loaded in from over a CDN. If you want your application to work better offline, download these fonts locally and point to them via a URL.'
      }
    },
    methods: {
      ...mapActions(['cardPreview']),
      
      textGeometry(text) {
        return `value: ${text}; size: 0.01; height: 0.005`;
      },
      cardClicked(e) {
        console.log('card', this.id);
        this.cardPreview(this.id);
      }
    }
    
  }
</script>