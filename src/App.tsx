import './App.css';
import {machine} from './fanMachine.tsx';

function App() {


  return (
    <>
      <h1>Rotating Fan</h1>

      <section className={"ceiling-container low"}>
        <div className={"ceiling-fan horizontal left"}></div>
        <div className={"ceiling-fan horizontal right"}></div>
        <div className={"ceiling-fan vertical top"}></div>
        <div className={"ceiling-fan vertical bottom"}></div>
      </section>

      <div>
        <fieldset>
          <legend>Set Timer</legend>
          <button
            type={'button'}
            onClick={() => {
            }}
            className={'timer-button'}
          >
            1 Hour
          </button>
          <button
            type={'button'}
            onClick={() => {
            }}
            className={'timer-button'}
          >
            2 Hours
          </button>
          <button
            type={'button'}
            onClick={() => {
            }}
            className={'timer-button'}
          >
            4 Hours
          </button>
          <button
            type={'button'}
            onClick={() => {
            }}
            className={'timer-button'}
          >
            8 Hours
          </button>
        </fieldset>

        <section>
          <div>
            <p className={''}>LOW</p>
            <p className={''}>MEDIUM</p>
            <p className={''}>HIGH</p>
          </div>
          <button type={'button'} onClick={() => {}} className={'speed'}>+/- Speed</button>
        </section>
      </div>
    </>
  )
}

export default App

