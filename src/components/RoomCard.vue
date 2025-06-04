<script>
export default {
  props: {
    label: String,
    capacity: Number,
    present: { type: Number, default: 0 },
    supervisor: String,
    to: [String, Object]
  }
}
</script>

<template>
  <RouterLink :to="to" class="block">
    <div class="border border-gray-600 rounded-lg w-[140px] h-[90px]
        text-center shadow-sm hover:border-black transition flex flex-col justify-between">
      <div class="pt-2 flex justify-between items-center px-3">
        <p class="text-lg font-semibold">{{ label }}</p>
        <div class="px-2 py-0.5 border-2 border-blue-400 text-sm text-gray-800 rounded-full leading-none">
          {{ present }} / {{ capacity }}
        </div>
      </div>

      <div class="border-t border-gray-300 pt-2 pb-2 px-3 text-xs flex justify-between items-center">
        <span class="font-bold">Surveillant</span>
        <span>{{ supervisor }}</span>
      </div>
    </div>
  </RouterLink>
</template>
