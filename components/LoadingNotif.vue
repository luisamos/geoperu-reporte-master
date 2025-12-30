<template>
    <div class="progress-bar-custom progress-bar progress-bar-primary progress-bar-striped active" role="progressbar" v-text="label"></div>
</template>
<script>
export default {
    props: {
        label: {
            type: String,
            required: false,
            default: ''
        }
    }
};
</script>
<style scoped>
.progress-bar-custom {
    border-radius: 50px;
    padding: 2px;
    position: fixed;
    right: 0;
    z-index: 99999;
    opacity: 0.8;
    width: 220px;
    height: 22px;
    color:#fff;
    text-shadow: 0 0 2px black;
    font-weight: 700;
}
</style>