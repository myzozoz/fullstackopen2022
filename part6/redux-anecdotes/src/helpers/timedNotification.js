let timeout

export const setTimedMessage = (setMessage, message, timeoutMs) => {
  clearTimeout(timeout)
  setMessage(message)
  timeout = setTimeout(() => setMessage(''), timeoutMs)
}
