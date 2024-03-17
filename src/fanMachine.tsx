import { setup, assign } from "xstate";

export const machine = setup({
  types: {
    context: {} as { speed: number; timer: number; fan_on: boolean },
    events: {} as
        | { type: "turn_on" }
        | { type: "turn_on_timer" }
        | { type: "turn_off_timer" }
        | { type: "increase_time" }
        | { type: "decrease_time" }
        | { type: "turn_off" }
        | { type: "increase_speed" }
        | { type: "decrease_speed" },
  },
  actions: {
    reset: assign({speed: 1, timer: 1}),
  },
}).createMachine({
  context: {
    speed: 1,
    timer: 1,
    fan_on: false,
  },
  id: "fan",
  initial: "FAN_OFF",
  states: {
    FAN_OFF: {
      tags: 'off',
      on: {
        turn_on: {
          target: "FAN_ON",
        },
      },
    },
    FAN_ON: {
      tags: 'on',
      type: "parallel",
      on: {
        turn_off: {
          target: "FAN_OFF",
          actions: {
            type: "reset",
          },
        },
      },
      states: {
        TIMER: {
          initial: "TIMER_OFF",
          states: {
            TIMER_OFF: {
              on: {
                turn_on_timer: {
                  target: "TIMER_ON",
                },
              },
            },
            TIMER_ON: {
              initial: "ONE_HOUR",
              on: {
                turn_off_timer: {
                  target: "TIMER_OFF",
                  actions: {
                    type: "updateTime",
                    params: {
                      newTime: 1,
                    },
                  },
                },
              },
              states: {
                ONE_HOUR: {
                  tags: 'oneHour',
                  on: {
                    increase_time: {
                      target: "TWO_HOURS",
                      actions: assign({timer: 2}),
                    },
                  },
                },
                TWO_HOURS: {
                  tags: 'twoHours',
                  on: {
                    increase_time: {
                      target: "FOUR_HOURS",
                      actions: assign({timer: 4}),
                    },
                    decrease_time: {
                      target: "ONE_HOUR",
                      actions: assign({timer: 1}),
                    },
                  },
                },
                FOUR_HOURS: {
                  tags: 'fourHours',
                  on: {
                    increase_time: {
                      target: "EIGHT_HOURS",
                      actions: assign({timer: 8}),
                    },
                    decrease_time: {
                      target: "TWO_HOURS",
                      actions: assign({timer: 2}),
                    },
                  },
                },
                EIGHT_HOURS: {
                  tags: 'eightHours',
                  on: {
                    decrease_time: {
                      target: "FOUR_HOURS",
                      actions: assign({timer: 4}),
                    },
                  },
                },
              },
            },
          },
        },
        SPEED: {
          initial: "LOW",
          states: {
            LOW: {
              tags: 'low',
              on: {
                increase_speed: {
                  target: "MEDIUM",
                  actions: assign({speed: 2})
                },
              },
            },
            MEDIUM: {
              tags: 'medium',
              on: {
                increase_speed: {
                  target: "HIGH",
                  actions: assign({speed: 3})
                },
                decrease_speed: {
                  target: "LOW",
                  actions: assign({speed: 1})
                },
              },
            },
            HIGH: {
              tags: 'high',
              on: {
                decrease_speed: {
                  target: "MEDIUM",
                  actions: assign({speed: 2})
                },
              },
            },
          },
        },
      },
    },
  },
});