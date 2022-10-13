import { debounce } from 'lodash'

function log() {
  console.log('xxx')
}

export const dlog = debounce(log, 3000)