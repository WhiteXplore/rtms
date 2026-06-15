// src/stores/transactionStore.js
import { defineStore } from "pinia";

export const useTransactionStore = defineStore("transaction", {
  state: () => ({
    steps: [
      { id: "10-1", name: "Return for Credentials", completed: false },

      {
        id: "10-2",
        name: "Schedule for Release of Credentials",
        completed: false,
      },
      {
        id: "10-3",
        name: "Processing of Documents",
        completed: false,
      },
      { id: "10-4", name: "Release of Credentials", completed: false },
    ],
  }),
  actions: {
    markStepCompleted(stepId) {
      const step = this.steps.find((s) => s.id === stepId);
      if (step && !step.completed) {
        step.completed = true;
        step.timestamp = this.formatTimestamp(new Date()); // Format timestamp
      }
    },
    formatTimestamp(date) {
      return new Intl.DateTimeFormat("en-US", {
        month: "long",
        day: "2-digit",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })
        .format(date)
        .replace(",", " at");
    },
  },
});
