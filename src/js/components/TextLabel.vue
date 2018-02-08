<template>
    <a-entity :position="position">
        <a-plane :width="width" :height="height" :color="background" shader="flat"></a-plane>
        <a-text :width="width" :value="text" :color="color" align="center" :wrap-count="wrapCount"></a-text>
    </a-entity>
</template>

<script>
export default {
    props: {
        text: String,
        height: String,
        width: String,
        position: String,
        background: String,
        color: String,
        wrapCount: String
    }
};
</script>
