// import { name } from './module1'
// import { name2 } from './module2'

export const getData = () => {
  // console.log(name, name2)
  import('./module1').then(res => {
    console.log(res.name)
  })
}