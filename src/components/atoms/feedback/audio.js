import newMessage from '../../../assets/sounds/newMessage.mp3'
import newConversation from '../../../assets/sounds/newConversation.mp3'
import closeConversation from '../../../assets/sounds/closeConversation.mp3'

import storage from '../../../utils/storage'

export default class AudioComponent {
  static instance = null
  _volume = parseInt(storage.get('volume') ?? '100')
  _notificationSound = new Audio(newMessage)

  static get inst() {
    if (AudioComponent.instance == null) {
      AudioComponent.instance = new AudioComponent()
    }
    return this.instance
  }

  static get volume() {
    return AudioComponent.inst._volume
  }

  static play(sound) {
    switch (sound) {
      case 'newMessage':
        AudioComponent.inst._notificationSound.src = newMessage
        break
      case 'newConversation':
        AudioComponent.inst._notificationSound.src = newConversation
        break
      case 'closeConversation':
        AudioComponent.inst._notificationSound.src = closeConversation
        break
      default:
        AudioComponent.inst._notificationSound.src = newMessage
        break
    }
    AudioComponent.inst._notificationSound.load()
    AudioComponent.inst._notificationSound.play()
  }

  static setVolume(volume) {
    storage.set('volume', volume)
    AudioComponent.inst._volume = volume
    AudioComponent.inst._notificationSound.volume = volume / 100
  }
}
