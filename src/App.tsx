import './App.css';
import {createActor} from "xstate";
import {machine} from './fanMachine.tsx';

function App() {
  const fanActor = createActor(machine);
  fanActor.subscribe((snapshot) => {
    console.log(snapshot);
  });

  fanActor.start();

  return (
    <div className={'app'}>
      <div></div>

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
            <p className={'hour'}>1 Hour</p>
            <p className={'hour'}>2 Hours</p>
            <p className={'hour'}>4 Hours</p>
            <p className={'hour'}>8 Hours</p>
          </div>
          <button
              type={'button'}
              onClick={() => {
              }}
              className={'timer-button'}
          >
            +/- Timer
          </button>
        </section>

        <section className={'control-section'}>
          <div className={'speeds'}>
            <p className={'speed'}>LOW</p>
            <p className={'speed'}>MEDIUM</p>
            <p className={'speed'}>HIGH</p>
          </div>
          <button type={'button'} onClick={() => {}} className={'speed'}>+/- Speed</button>
        </section>
        <div>
          {fanActor.getSnapshot().hasTag('off')
           ? <button type={'button'} className={'on-off-button'} onClick={() => fanActor.send({ type: 'turn_on' })}>ON</button>
          : <button type={'button'} className={'on-off-button'} onClick={() => fanActor.send({type: 'turn_off'})}>OFF</button>
          }
        </div>
      </div>
    </div>
  )
}

export default App

