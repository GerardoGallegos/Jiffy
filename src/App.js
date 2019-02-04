import React from 'react'
import getAudioSource from './util/getAudioSource'
import DATA from './DATA'
import './global.css'

class App extends React.Component {
  state = {
    showModal: false,
    currentStep: 0,
    playing: false,
    phrase: {},

    steps: [
      { type: 'audio', audioKey: 'to', speed: 1, nextDelay: 0 },
      { type: 'audio', audioKey: 'from', speed: 1 },
      { type: 'audio', audioKey: 'to', speed: 0.5, nextDelay: 600 },
      { type: 'audio', audioKey: 'from', speed: 1 },
      { type: 'audio', audioKey: 'to', speed: 1, nextDelay: 0 },
      { type: 'audio', audioKey: 'to', speed: 0.7, nextDelay: 600 },
    ]
  }

  // Timeout used for audio
  delayTimer = null

  play = (phrase) => {
    if (this.state.playing) {
      // Pause and clearTimeout
      window.clearTimeout(this.delayTimer)
      this.audio.pause()
      this.setState({
        playing: false,
        currentStep: 0
      })
    }

    this.setState({
      playing: true,
      currentStep: 0,
      phrase
    }, () => this.iterate())
  }

  iterate = () => {
    const { steps, currentStep, phrase } = this.state
    const current = steps[currentStep]
    const nextDelay = current.nextDelay || 0
  
    this.delayTimer = window.setTimeout(() => {
      const { currentStep, steps } = this.state
      const current = steps[currentStep]

      if (current.type === 'audio') {
        this.playAudio(current)
      }
    }, nextDelay)
  }

  playAudio = (currentStep) => {
    const { phrase } = this.state
    const { speed, audioKey } = currentStep
    const text = phrase[audioKey]
    const lang = DATA.lang[audioKey]
    const audioSource = getAudioSource({ text, lang })
    this.audio = new Audio(audioSource)
    this.audio.playbackRate = speed

    this.audio.oncanplay = () => {
      this.audio.play()
    }

    this.audio.onended = () => {
      // Checks if exist next step
      const { currentStep, steps } = this.state
      if (currentStep < steps.length - 1) {
        this.setState(state => ({
          currentStep: state.currentStep + 1
        }), () => this.iterate())
      } else {
        this.setState({
          playing: false,
          currentStep: 0,
          phrase: {}
        })
      }
    }
  }

  render () {
    const { phrase, currentStep, steps } = this.state
    return (
      <div>
        <h1>Jiffi</h1>
        <h2>
          { phrase.to } { currentStep } / { steps.length - 1 }  
        </h2>
        <ul>
          {DATA.list.map(phrase => (
            <li
              key={phrase.to}
              onClick={this.play.bind(this, phrase)}  
            >
              { phrase.to } : { phrase.from }  
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default App