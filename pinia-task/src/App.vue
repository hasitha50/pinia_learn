<template>
  <main>
    <!-- heading -->
    <header>
      <img src="https://pinia.vuejs.org/logo.svg" alt="pinia logo">
      <h1>Pinia Tasks</h1>
    </header>
    <!-- new task form -->
    <div class="new-task-form">
      <TaskForm />
    </div>

    <!-- filter -->
    <nav class="filter">
      <button :class="{ active: filter === 'all' }" @click="filter = 'all'">All tasks</button>
      <button :class="{ active: filter === 'favs' }" @click="filter = 'favs'">Fav tasks</button>
    </nav>

    <!-- loading -->
    <div class="loading" v-if="taskStore.loading">Loading tasks...</div>

    <!-- all tasks -->
    <div class="task-list" v-if="filter === 'all'">
      <p>You have {{ taskStore.totalCount }} tasks left to do.</p>
      <div v-for="task in taskStore.tasks" :key="task.id">
        <TaskDetails :task="task" @delete-task="handleDelete" @toggle-fav="handleToggleFavorite" />
      </div>
    </div>

    <!-- fav tasks -->
    <div class="task-list" v-if="filter === 'favs'">
      <p>You have {{ taskStore.favCount }} tasks in your favs list.</p>
      <div v-for="task in taskStore.favs" :key="task.id">
        <TaskDetails :task="task" @delete-task="handleDelete" @toggle-fav="handleToggleFavorite" />
      </div>
    </div>
  </main>
</template>

<script>
import { ref } from 'vue'
import TaskDetails from './components/TaskDetails.vue'
import TaskForm from './components/TaskForm.vue'

import { useTaskStore } from './stores/TaskStore'

export default {
  components: { TaskDetails },
  setup() {
    const taskStore = useTaskStore()
    const filter = ref('all')

    taskStore.getTasks()
    
    const handleDelete = (id) => {
      taskStore.tasks = taskStore.tasks.filter(task => task.id !== id)
    }

    const handleToggleFavorite = (id) => {
      const task = taskStore.tasks.find(t => t.id === id)
      if (task) task.isFav = !task.isFav
    }

    return {
      taskStore,
      filter,
      handleDelete,
      handleToggleFavorite
    }
  }
}
</script>

<style scoped></style>
