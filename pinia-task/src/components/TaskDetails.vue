<template>
    <div class="task">
      <h3>{{ task.title }}</h3>
      <div class="icons">
        <i class="material-icons" @click="$emit('delete-task', task.id)">delete</i>
        <i 
          class="material-icons" 
          :class="{ 'is-fav': task.isFav }" 
          @click="$emit('toggle-fav', task.id)"
        >
          favorite
        </i>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      task: Object
    }
  }
  </script>
  
  <style scoped>
  .task {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px;
    border: 1px solid #ccc;
    margin-bottom: 10px;
  }
  
  .icons {
    display: flex;
    gap: 10px;
  }
  
  .material-icons {
    cursor: pointer;
  }
  
  .is-fav {
    color: red;
  }
  </style>
  