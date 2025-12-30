<template> 
  <div v-if="offline" style="position:fixed;right:2px;z-index:999;opacity:0.5;top:2px;">  
    <label class="label label-danger" v-text="desc"></label>
  </div>
</template>
  
<script>
export default {
  data: () => {
    return {
      offline: false,
      desc: 'Modo: Sin Conexión'
    }
  },
  mounted() {
    let handleNetworkChange = (event) => {
      if (navigator.onLine) {
        this.offline = false;
      } else {
        console.log('offline')
        this.offline = true;
      }
    }
    handleNetworkChange();
    window.addEventListener("online", handleNetworkChange);
    window.addEventListener("offline", handleNetworkChange); 
  }
}
</script>