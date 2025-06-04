<script>
import HeaderComponent from './components/HeaderComponent.vue';

export default {
  components: {
    HeaderComponent,
  }
}
</script>

<template>
  <HeaderComponent />
  <main>
    <RouterView />
  </main>
</template>
