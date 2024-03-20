import {setup, assign, raise} from "xstate";

export enum TimerSetting {
    Timer_Off = 0,
    One_Hour = 1,
    Two_Hours = 2,
    Four_Hours = 3,
    Eight_Hours = 4,
}

export enum Speed {
    Low = 0,
    Medium = 1,
    High = 2,
}

export enum Direction {
    Decrease = 0,
    Increase = 1,
}

export const machine = setup({
    types: {
        context: {} as {
            speed: Speed;
            timer: TimerSetting;
            fan_on: boolean,
            speed_direction: Direction,
            timer_direction: Direction
        },
        events: {} as
            | { type: "turn_on" }
            | { type: "turn_off" }
            | { type: "change_timer" }
            | { type: "increase_time" }
            | { type: "decrease_time" }
            | { type: 'change_speed' }
            | { type: "increase_speed" }
            | { type: "decrease_speed" },
    },
    actions: {
        reset: assign({speed: 1, timer: 1}),
    },
}).createMachine({
    context: {
        speed: Speed.Low,
        speed_direction: Direction.Increase,
        timer: TimerSetting.Timer_Off,
        timer_direction: Direction.Increase,
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
                            tags: 'timeOff',
                            on: {
                                change_timer: {
                                    target: "ONE_HOUR",
                                    actions: assign(({context}) => {
                                        return {
                                            ...context,
                                            timer: TimerSetting.One_Hour,
                                            timer_direction: Direction.Increase,
                                        }
                                    })
                                },
                            },
                        },
                        ONE_HOUR: {
                            tags: 'oneHour',
                            on: {
                                change_timer: {
                                    actions: [assign(({context}) => {
                                        return {
                                            ...context,
                                            timer: context.timer_direction === Direction.Increase
                                                ? TimerSetting.Two_Hours
                                                : TimerSetting.Timer_Off,
                                        }
                                    }),
                                        raise(({context}) => {
                                            return context.timer_direction === Direction.Increase
                                                ? {type: 'increase_time'}
                                                : {type: 'decrease_time'};
                                        })
                                    ],
                                },
                                increase_time: {
                                    target: 'TWO_HOURS',
                                },
                                decrease_time: {
                                    target: 'TIMER_OFF',
                                }
                            },
                        },
                        TWO_HOURS: {
                            tags: 'twoHours',
                            on: {
                                change_timer: {
                                    actions: [assign(({context}) => {
                                        return {
                                            ...context,
                                            timer: context.timer_direction === Direction.Increase
                                                ? TimerSetting.Four_Hours
                                                : TimerSetting.One_Hour,
                                        }
                                    }),
                                        raise(({context}) => {
                                            return context.timer_direction === Direction.Increase
                                                ? {type: 'increase_time'}
                                                : {type: 'decrease_time'};
                                        })
                                    ],
                                },
                                increase_time: {
                                    target: 'FOUR_HOURS',
                                },
                                decrease_time: {
                                    target: 'ONE_HOUR',
                                }
                            },
                        },
                        FOUR_HOURS: {
                            tags: 'fourHours',
                            on: {
                                change_timer: {
                                    actions: [assign(({context}) => {
                                        return {
                                            ...context,
                                            timer: context.timer_direction === Direction.Increase
                                                ? TimerSetting.Eight_Hours
                                                : TimerSetting.Two_Hours,
                                        }
                                    }),
                                        raise(({context}) => {
                                            return context.timer_direction === Direction.Increase
                                                ? {type: 'increase_time'}
                                                : {type: 'decrease_time'};
                                        })
                                    ],
                                },
                                increase_time: {
                                    target: 'EIGHT_HOURS',
                                },
                                decrease_time: {
                                    target: 'TWO_HOURS',
                                }
                            },
                        },
                        EIGHT_HOURS: {
                            tags: 'eightHours',
                            on: {
                                change_timer: {
                                    target: "FOUR_HOURS",
                                    actions: assign(({context}) => {
                                        return {
                                            ...context,
                                            timer: TimerSetting.Four_Hours,
                                            timer_direction: Direction.Decrease,
                                        }
                                    }),
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
                                change_speed: {
                                    target: "MEDIUM",
                                    actions: assign(({context}) => {
                                        return {
                                            ...context,
                                            speed: Speed.Medium,
                                            speed_direction: Direction.Increase,
                                        }
                                    })
                                },
                            },
                        },
                        MEDIUM: {
                            tags: 'medium',
                            on: {
                                change_speed: {
                                    actions: [
                                        assign({
                                            speed: ({context}) => {
                                                return context.speed_direction === Direction.Increase
                                                    ? Speed.High
                                                    : Speed.Low;
                                            }
                                        }),
                                        raise(({context}) => {
                                            if (context.speed_direction === Direction.Increase) {
                                                return {type: 'increase_speed'};
                                            }
                                            return {type: 'decrease_speed'}
                                        })
                                    ],
                                },
                                decrease_speed: {
                                    target: 'LOW',
                                },
                                increase_speed: {
                                    target: 'HIGH',
                                }
                            },
                        },
                        HIGH: {
                            tags: 'high',
                            on: {
                                change_speed: {
                                    target: "MEDIUM",
                                    actions: assign(({context}) => {
                                        return {
                                            ...context,
                                            speed: Speed.Medium,
                                            speed_direction: Direction.Decrease,
                                        }
                                    })
                                },
                            },
                        },
                    },
                },
            },
        },
    },
});