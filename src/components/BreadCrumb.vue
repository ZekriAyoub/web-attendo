<script>
export default {
  computed: {
    breadcrumbs() {
      const meta = this.$route.meta
      const breadcrumb = typeof meta.breadcrumb === 'function' ? meta.breadcrumb(this.$route) : meta.breadcrumb
      if (!breadcrumb) return []
      return breadcrumb
    }
  }
}
</script>

<template>
  <nav v-if="breadcrumbs.length" class="text-sm text-blue-600 mb-4 border border-blue-200 p-2 bg-white">
    <ol class="list-reset flex space-x-2">
      <li v-for="(crumb, index) in breadcrumbs" :key="index" class="flex items-center">
        <RouterLink :to="crumb.to" :class="['hover:underline font-medium',
          index === breadcrumbs.length - 1 ? 'text-blue-800' : 'text-blue-500']">
          {{ crumb.label }}
        </RouterLink>
        <span v-if="index < breadcrumbs.length - 1" class="mx-2 text-xl font-semibold text-blue-300">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5L15.75 12 8.25 19.5" />
          </svg>
        </span>
      </li>
    </ol>
  </nav>
</template>
