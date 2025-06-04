<script>
export default {
  props: {
    title: { type: String, default: 'Ajouter' },
    labelText: { type: String, default: 'Nouveau' },
    placeholder: { type: String, default: '' },
    modelValue: String,
    buttonText: { type: String, default: 'Ajouter' },
    type: { type: String, default: 'text' },
    options: Array,
    selectPlaceholder: { type: String, default: ' Choisissez une option ' }
  },
  emits: ['update:modelValue', 'submit']
}
</script>

<template>
  <div class="bg-white rounded-xl shadow-md p-4 border border-gray-300">
    <h3 class="text-lg font-semibold mb-2">{{ title }}</h3>
    <div class="flex items-center">
      <div class="flex items-center border rounded-xl focus-within:ring-2 focus-within:ring-purple-500
       focus-within:border-purple-500 transition-colors bg-gray-100">
        <span class="text-gray-500 px-1 py-1 rounded-l-xl whitespace-nowrap">
          {{ labelText }}
        </span>

        <span class="text-purple-600 px-2 border-r border-gray-300">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none"
               viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
               class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
        </span>

        <template v-if="type === 'text'">
          <input :placeholder="placeholder" :value="modelValue"
          @input="$emit('update:modelValue', $event.target.value)"
          class="bg-gray-100 px-3 py-2 outline-none w-full rounded-r-xl"/>
        </template>

        <template v-else-if="type === 'select'">
          <select :value="modelValue" @change="$emit('update:modelValue', $event.target.value)"
            class="bg-gray-100 px-3 py-2 outline-none w-full rounded-r-xl">
            <option disabled value="">{{ selectPlaceholder }}</option>
            <option v-for="opt in options" :key="opt" :value="opt">{{ opt }}</option>
          </select>
        </template>
      </div>

      <button @click="$emit('submit')"
      class="ml-3 border px-4 py-2 rounded hover:bg-gray-100 transition-colors">
        {{ buttonText }}
      </button>
    </div>
  </div>
</template>
