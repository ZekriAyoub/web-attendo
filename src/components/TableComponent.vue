<script>
export default {
  props: {
    headers: Array,
    content: Array,
    attributes: Array,
    rowClass: Function,
    enableFilters: { type: Boolean, default: false }
  },
  data() {
    return {
      filters: {}
    }
  },
  computed: {
    filteredContent() {
      return this.content.filter(item =>
        Object.entries(this.filters).every(([key, val]) =>
          val ? String(item[key] || '').toLowerCase().startsWith(val.toLowerCase()) : true
        )
      )
    }
  }

}
</script>

<template>
  <div class="p-6 max-w-5xl mx-auto">
    <div class="rounded-2xl overflow-hidden shadow-md bg-white mb-8">
      <table class="min-w-full border border-gray-300 rounded-md">
        <thead class="bg-black text-white uppercase text-sm text-left">
          <tr>
            <th v-for="header in headers" :key="header" class="px-6 py-3">
              {{ header }}
            </th>
          </tr>
          <tr v-if="enableFilters" class="bg-white text-black">
            <th v-for="(attr, index) in attributes" :key="index" class="px-6 py-2">
              <input type="text" class="w-1/2 p-1 border rounded" v-model="filters[attr]" placeholder="Filtrer..." />
            </th>
          </tr>
        </thead>

        <tbody v-if="$slots.row">
          <!-- Slot personnalisé -->
          <tr v-for="item in filteredContent" :key="item.id"
            :class="[rowClass ? rowClass(item) : '', 'cursor-pointer', 'hover:bg-blue-50']"
            @click="$emit('rowClick', item)">
            <slot name="row" :item="item"></slot>
          </tr>
        </tbody>

        <tbody v-else>
          <!-- Sinon affichage automatique -->
          <tr v-for="item in content" :key="item.id"
            :class="[rowClass ? rowClass(item) : '', 'cursor-pointer', 'hover:bg-blue-50']"
            @click="$emit('rowClick', item)">
            <td v-for="attr in attributes" :key="attr" class="px-6 py-3 text-gray-700">
              {{ item[attr] }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
