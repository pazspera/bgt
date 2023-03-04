<template>
  <div class="spin"></div>
</template>

<script>
export default {
  name: "LoadingSpinner",
};
</script>

<style lang="scss">
@import "@/assets/scss/main.scss";
.spin {
  display: block;
  width: 40px;
  height: 40px;
  margin: 30px auto;
  border: 3px solid transparent;
  border-radius: 50%;
  border-top-color: $primary-medium;
  animation: spin 1s ease infinite;
}
@keyframes spin {
  to {
    -webkit-transform: rotateZ(360deg);
  }
}
</style>
