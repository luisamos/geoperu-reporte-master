<template>
  <div class="overlay">
    <div class="overlay__inner">
      <div class="overlay__content">
        <span class="spinner"></span>
        <br>
        <span class="text" v-text="label"></span>
      </div>
    </div>
  </div>
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
.overlay {
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  position: fixed;
  background: rgba(58, 53, 53, 0.5);
  z-index: 9999;
}

.overlay__inner {
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  position: absolute;
}

.overlay__content {
    text-align: center;
  width: 300px;
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
}

.text {
    color: black;
    text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white;
    font-size: 16px;
    font-weight: 500;
}

.spinner {
  width: 75px;
  height: 75px;
  display: inline-block;
  border-width: 3px;
  border-color: rgba(255, 255, 255, 0.05);
  border-top-color: #fff;
  animation: spin 1s infinite linear;
  border-radius: 100%;
  border-style: solid;
}

@keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}
</style>