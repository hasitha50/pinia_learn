import { defineStore } from 'pinia'
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { format, differenceInDays } from 'date-fns'

export const useHabitStore = defineStore('habitStore', {
  state: () => ({
    habits: [],
  }),

  actions: {
    // Fetch all habits from Firebase
    async fetchHabits() {
      const { $db } = useNuxtApp()
      const snapshot = await getDocs(collection($db, 'habits'))
      this.habits = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))
    },

    // Add a new habit to Firebase and Pinia state
    async addHabit(name) {
      const { $db } = useNuxtApp()
      const habit = {
        name,
        completions: [],
        streak: 0,
      }

      const docRef = await addDoc(collection($db, 'habits'), habit)
      this.habits.push({ id: docRef.id, ...habit })
    },

    // Delete a habit
    async deleteHabit(id) {
      const { $db } = useNuxtApp()
      const docRef = doc($db, 'habits', id)

      await deleteDoc(docRef)
      this.habits = this.habits.filter((habit) => habit.id !== id)
    },

    // Update a habit
    async updateHabit(id, updates) {
      const { $db } = useNuxtApp()
      const habitRef = doc($db, 'habits', id)

      await updateDoc(habitRef, updates)

      const index = this.habits.findIndex((habit) => habit.id === id)
      if (index !== -1) {
        this.habits[index] = { ...this.habits[index], ...updates }
      }
    },

    // Toggle today's completion
    toggleCompletion(habit) {
      const today = format(new Date(), 'yyyy-MM-dd')

      if (habit.completions.includes(today)) {
        habit.completions = habit.completions.filter((date) => date !== today)
      } else {
        habit.completions.push(today)
      }
      habit.streak = this.calculateStreak(habit.completions)
      this.updateHabit(habit.id, {
        completions: habit.completions,
        streak: habit.streak
      })
    },

    // Calculate current streak based on completion dates
    calculateStreak(completions) {
      const sortedDates = [...completions].sort((a, b) => new Date(b) - new Date(a))
      let streak = 0
      let today = new Date()

      for (const date of sortedDates) {
        const diff = differenceInDays(today, new Date(date))

        if (diff > 1) {
          break
        }

        streak += 1
        today = new Date(date)
      }

      return streak
    },
  },
})
