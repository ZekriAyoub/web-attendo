<script>
export default {
  props: {
    label: { type: String, required: true },
    to: { type: [String, Object], required: true },
    completed: { type: Boolean, default: false },
    toggleable: { type: Boolean, default: false }
  },
  emits: ['toggle']
}
</script>

<template>
  <div class="flex flex-col items-center gap-1">
    <RouterLink :to="to" class="block">
      <div class="bg-gray-100 rounded-xl shadow-md w-[160px] h-[200px]
        flex flex-col items-center justify-start pt-6 text-center border border-transparent
        hover:border-black transition relative">
        <h3 class="capitalize font-bold text-gray-800 text-lg">
          {{ label }}
        </h3>
        <span v-if="completed" class="text-green-600 font-semibold text-sm">Terminé</span>
      </div>
    </RouterLink>

    <label v-if="toggleable" class="flex items-center gap-2 text-sm mt-1">
      <input type="checkbox" :checked="completed" @change="$emit('toggle', !completed)" />
      Terminé
    </label>
  </div>
</template>
