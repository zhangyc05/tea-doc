import { ref } from 'vue'

type OperationMessageState = {
  operationMessage?: string
}

export function useOperationMessage(initialMessage = '') {
  const text = ref(initialMessage)

  function set(message: string) {
    text.value = message
  }

  function clear() {
    text.value = ''
  }

  function fromStore(state: OperationMessageState) {
    if (!state.operationMessage) return
    set(state.operationMessage)
  }

  return {
    text,
    set,
    clear,
    fromStore,
  }
}
