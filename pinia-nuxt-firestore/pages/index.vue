<template>
  <div class="mx-auto p-6 max-w-2xl">
    <h1 class="text-4xl font-bold text-center mb-8">Habit Tracker</h1>
    <HabitForm />
    <HabitList  :habits="habitStore.habits"/>
  </div>
</template>

<script setup>
//  imports
import { useHabitStore } from '~/stores/habits'
import HabitForm from '~/components/HabitForm.vue'
import HabitList from '~/components/HabitList.vue'

const  habitStore =useHabitStore()
habitStore.fetchHabits()

</script>

<style>
body {
  background: #f1f1f1;
}
</style>