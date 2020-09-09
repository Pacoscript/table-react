import enMessages from './locales/en_US.json'
import esMessages from './locales/es_ES.json'

const formatMessage = (messageDescriptor, languaje) => {
  const messages = languaje === 'english' ? enMessages : esMessages
return (messages[messageDescriptor])
}

export { formatMessage }
