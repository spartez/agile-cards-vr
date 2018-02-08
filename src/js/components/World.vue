<template>
    <a-scene>
        <a-box position="-1 0.5 -3" rotation="0 45 0" color="#4CC3D9" shadow></a-box>
        <a-sphere position="0 1.25 -5" radius="1.25" :color="colorOfSphere" shadow></a-sphere>
        <a-cylinder position="1 0.75 -3" radius="0.5" height="1.5" color="#FFC65D" shadow></a-cylinder>
        <a-plane position="0 0 -4" rotation="-90 0 0" width="4" height="4" color="#7BC8A4" shadow></a-plane>
        <a-entity environment="preset: forest; numDressing: 500"></a-entity>
    </a-scene>
</template>

<script>
    export default {
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
