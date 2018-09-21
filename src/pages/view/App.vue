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
  padding: constant(safe-area-inset-top)
        constant(safe-area-inset-right)
        constant(safe-area-inset-bottom)
        constant(safe-area-inset-left);
}
</style>
