<template>
  <div>
    <ul class="space-y-4">
      <li 
      v-for="habit in props.habits"
      :key ="habit.id"
      class="bg-white px-3 py-2 rounded-sm">

        <div class="flex items-center justify-between mb-4">
          <p class="text-purple-500 font-bold">{{ habit.name }}</p>
          <button class="text-gray-800" @click="deleteHabit(habit.id)">Delete</button>
        </div>

        <div class="flex items-center">
          <input 
            type="checkbox" 
            class="mr-2 accent-purple-500"
            @change="toggleCompletion(habit)"
            :checked="habit.completions.includes(today)"
          />
          <p class="text-sm text-gray-500">I did this today.</p>
        </div>

        <p class="text-sm text-gray-500 mt-2">Current Streak: {{ habit.streak }} days.</p>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { format } from 'date-fns' // ← Add this!

import { useHabitStore } from '~/stores/habits'

const props = defineProps({
  habits: Array,
})

const habitStore = useHabitStore()

const deleteHabit = async (id) => {
  await habitStore.deleteHabit(id)
}

const toggleCompletion = async (habit) => {
  await habitStore.toggleCompletion(habit)
}

const today = format(new Date(), 'yyyy-MM-dd')
</script>
