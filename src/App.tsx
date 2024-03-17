import './App.css';
import {createActor} from "xstate";
import {machine} from './fanMachine.tsx';

function App() {
  const fanActor = createActor(machine);
  fanActor.subscribe((snapshot) => {
    console.log(snapshot);
  });

  fanActor.start();

  const fanState = fanActor.getSnapshot();

  return (
    <div className={'app'}>
      <h1>Rotating Fan</h1>

      <section className={"container low"}>
        <div className={"fan horizontal left"}></div>
        <div className={"fan horizontal right"}></div>
        <div className={"fan vertical top"}></div>
        <div className={"fan vertical bottom"}></div>
      </section>

      <div className={'controls'}>
        <section className={'control-section'}>
          <div className={'hours'}>
            <p className={`hour ${fanState.hasTag('oneHour') ? 'active' : ''}`}>1 Hour</p>
            <p className={`hour ${fanState.hasTag('twoHours') ? 'active' : ''}`}>2 Hours</p>
            <p className={`hour ${fanState.hasTag('fourHours') ? 'active' : ''}`}>4 Hours</p>
            <p className={`hour ${fanState.hasTag('eightHours') ? 'active' : ''}`}>8 Hours</p>
          </div>
          <button
              type={'button'}
              onClick={() => {}}
              className={'timer-button'}
          >
            +/- Timer
          </button>
        </section>

        <section className={'control-section'}>
          <div className={'speeds'}>
            <p className={`speed ${fanState.hasTag('low') ? 'active' : ''}`}>LOW</p>
            <p className={`speed ${fanState.hasTag('medium') ? 'active' : ''}`}>MEDIUM</p>
            <p className={`speed ${fanState.hasTag('high') ? 'active' : ''}`}>HIGH</p>
          </div>
          <button type={'button'} onClick={() => {}} className={'speed'}>+/- Speed</button>
        </section>

        <div>
          {fanState.hasTag('off')
           ? <button type={'button'} className={'on-off-button'} onClick={() => fanActor.send({ type: 'turn_on' })}>ON</button>
          : <button type={'button'} className={'on-off-button'} onClick={() => fanActor.send({type: 'turn_off'})}>OFF</button>
          }
        </div>
        </div>
    </div>
  )
}

export default App

