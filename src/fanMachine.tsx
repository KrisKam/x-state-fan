import { setup, assign } from "xstate";

export const machine = setup({
  types: {
    context: {} as { speed: number; timer: number; fan_on: boolean },
    events: {} as
      | { type: "turn_on" }
      | { type: "turn_on_timer" }
      | { type: "increase_time" }
      | { type: "decrease_time" }
      | { type: "turn_off_timer" }
      | { type: "turn_off" }
      | { type: "increase_speed" }
      | { type: "decrease_speed" },
  },
  actions: {
    updateTime: function ({ context, event }, params) {
      // Add your action code here
      // ...
    },
    reset: function ({ context, event }, params) {
      // Add your action code here
      // ...
    },
  },
  schemas: {
    events: {
      turn_on: {
        type: "object",
        properties: {},
      },
      turn_on_timer: {
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
      turn_off_timer: {
        type: "object",
        properties: {},
      },
      turn_off: {
        type: "object",
        properties: {},
      },
      "": {
        type: "object",
        properties: {},
      },
      increase_speed: {
        type: "object",
        properties: {},
      },
      decrease_speed: {
        type: "object",
        properties: {},
      },
    },
    context: {
      speed: {
        type: "number",
        description:
          'Generated automatically based on the key: "speed" in initial context values',
      },
      timer: {
        type: "number",
        description:
          'Generated automatically based on the key: "timer" in initial context values',
      },
      fan_on: {
        type: "boolean",
        description:
          'Generated automatically based on the key: "fan_on" in initial context values',
      },
    },
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
      on: {
        turn_on: {
          target: "FAN_ON",
        },
      },
    },
    FAN_ON: {
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
                  on: {
                    increase_time: {
                      target: "TWO_HOURS",
                      actions: {
                        type: "updateTime",
                        params: {
                          newTime: 2,
                        },
                      },
                    },
                  },
                },
                TWO_HOURS: {
                  on: {
                    increase_time: {
                      target: "FOUR_HOURS",
                      actions: {
                        type: "updateTime",
                        params: {
                          newTime: 4,
                        },
                      },
                    },
                    decrease_time: {
                      target: "ONE_HOUR",
                      actions: {
                        type: "updateTime",
                        params: {
                          newTime: 1,
                        },
                      },
                    },
                  },
                },
                FOUR_HOURS: {
                  on: {
                    increase_time: {
                      target: "EIGHT_HOURS",
                      actions: {
                        type: "updateTime",
                        params: {
                          newTime: 8,
                        },
                      },
                    },
                    decrease_time: {
                      target: "TWO_HOURS",
                      actions: {
                        type: "updateTime",
                        params: {
                          newTime: 2,
                        },
                      },
                    },
                  },
                },
                EIGHT_HOURS: {
                  on: {
                    decrease_time: {
                      target: "FOUR_HOURS",
                      actions: {
                        type: "updateTime",
                        params: {
                          newTime: 4,
                        },
                      },
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
              on: {
                increase_speed: {
                  target: "MEDIUM",
                },
              },
            },
            MEDIUM: {
              on: {
                increase_speed: {
                  target: "HIGH",
                },
                decrease_speed: {
                  target: "LOW",
                },
              },
            },
            HIGH: {
              on: {
                decrease_speed: {
                  target: "MEDIUM",
                },
              },
            },
          },
        },
      },
    },
  },
});