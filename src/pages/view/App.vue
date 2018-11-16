<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, 'Microsoft YaHei', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
body {
  margin: 0;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
}
.ipx-padding {
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom); /* 兼容 iOS >= 11.2 */
}

.opentip {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0,0,0, .67);
  z-index: 9999;
}

.opentip__t {
  position: absolute;
  right: 1rem;
  top: 1rem;
  color: #fff;
  font-size: 1.4rem;
}

.opentip__t--2 {
  top: 4rem;
}
</style>
