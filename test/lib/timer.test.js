import {debounce, throttle} from '../../client/lib/timer'

describe('test debounce', () => {
  test('立即执行 - debounce(fn, wait, true)', async () => {
    let total = 0
    
    const fn = () => {
      console.log(`total:${total++}`)
    }
    
    const fnDebounce = debounce(fn, 100, true)

    for (let i = 0; i < 100; i++) {
      fnDebounce()
    }

    console.log(total)
  })
})

describe('test throttle', () => {
  test('测试累加的结果', async () => {
    let total = 0

    const fn = throttle(function () {
      total++
    }, 300)

    for(let i = 0; i < 10; i++) {
      fn()
    }

    expect(total).toBe(1)
  })
})