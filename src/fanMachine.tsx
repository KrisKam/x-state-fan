import { setup, assign } from "xstate";

export const machine = setup({
  types: {
    context: {} as {},
    events: {} as
      | { type: "turn_off" }
      | { type: "turn_on" }
      | { type: "increase_time" }
      | { type: "decrease_time" }
      | { type: "turn_on_timer" }
      | { type: "increase_to_medium" }
      | { type: "decrease_to_low" }
      | { type: "increase_to_high" }
      | { type: "decrease_to_medium" }
      | { type: "turn_off_timer" },
  },
  actions: {
    reset: function ({ context, event }, params) {
      // Add your action code here
      // ...
    },
    increaseFanSpeed: assign({
      speed: ({ context }) =>
        context.speed < 3 ? context.speed + 1 : context.speed,
    }),
    decreaseFanSpeed: assign({
      speed: ({ context }) =>
        context.speed === 1 ? context.speed : context.speed - 1,
    }),
    updateTime: assign({
      timer: ({ context }, params) => params.newTime,
    }),
  },
  schemas: {
    events: {
      turn_off: {
        type: "object",
        properties: {},
      },
      turn_on: {
        type: "object",
        properties: {},
      },
      increase_time: {
        type: "object",
        properties: {},
      },
      decrease_time: {
        type: "object",
        properties: {},
      },
      turn_on_timer: {
        type: "object",
        properties: {},
      },
      increase_to_medium: {
        type: "object",
        properties: {},
      },
      decrease_to_low: {
        type: "object",
        properties: {},
});