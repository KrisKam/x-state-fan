import './App.css';
import {machine} from './fanMachine.tsx';
import {useActor} from "@xstate/react";

function App() {
  const [state, send] = useActor(machine);

  function getFanSpeedClasses() {
    let classes = 'container';
    if (state.hasTag('low')) {
      classes += ' low';
    }
    if (state.hasTag('medium')) {
      classes += ' medium';
    }
    if (state.hasTag('high')) {
      classes += ' high';
    }
    return classes;
  }

  return (
    <div className={'app'}>
      <h1>Rotating Fan</h1>

      <section className={getFanSpeedClasses()}>
        <div className={"fan horizontal left"}></div>
        <div className={"fan horizontal right"}></div>
        <div className={"fan vertical top"}></div>
        <div className={"fan vertical bottom"}></div>
      </section>

      <div className={'controls'}>
        <section className={'control-section'}>
          <div className={'hours'}>
            <p className={`hour ${state.hasTag('timeOff') ? 'active' : ''}`}>Timer Off</p>
            <p className={`hour ${state.hasTag('oneHour') ? 'active' : ''}`}>1 Hour</p>
            <p className={`hour ${state.hasTag('twoHours') ? 'active' : ''}`}>2 Hours</p>
            <p className={`hour ${state.hasTag('fourHours') ? 'active' : ''}`}>4 Hours</p>
            <p className={`hour ${state.hasTag('eightHours') ? 'active' : ''}`}>8 Hours</p>
          </div>
          <button
              type={'button'}
              onClick={() => send({type: 'change_timer'})}
              className={''}
          >
            +/- Time
          </button>

        </section>

        <section className={'control-section'}>
          <div className={'speeds'}>
          <p className={`speed ${state.hasTag('low') ? 'active' : ''}`}>LOW</p>
            <p className={`speed ${state.hasTag('medium') ? 'active' : ''}`}>MEDIUM</p>
            <p className={`speed ${state.hasTag('high') ? 'active' : ''}`}>HIGH</p>
          </div>
          <button
              type={'button'}
              onClick={() => send({type: 'change_speed'})}
              className={'speed'}
          >
            +/- Speed
          </button>
        </section>

        <div>
          {state.hasTag('off')
           ? <button type={'button'} className={'on-off-button'} onClick={() => send({type: 'turn_on'})}>ON</button>
          : <button type={'button'} className={'on-off-button'} onClick={() => send({type: 'turn_off'})}>OFF</button>
          }
        </div>
        </div>
    </div>
  )
}

export default App

