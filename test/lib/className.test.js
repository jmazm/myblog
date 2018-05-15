/**
 * @jest-environment jsdom
 */

import {addClass, removeClass, replaceClass} from '../../client/lib/className'

describe('test some methods about class', () => {
  // 添加类名
  describe('test method: addClass', () => {
    test(`div's class is empty`, async () => {
      const div = document.createElement('div')
      addClass(div, 'red')
      expect(div.className).toBe('red')
    })

    test(`div's class has content`, async () => {
      const div = document.createElement('div')
      div.className = 'blue'
      addClass(div, 'red')
      expect(div.className).toBe('blue red')
    })
  })

  // 移除类名
  describe('test method: removeClass', () => {
    test('succeeded to remove class ', async () => {
      const div = document.createElement('div')
      div.className = 'blue red yellow'
      removeClass(div, 'red')
      expect(div.className).toBe('blue yellow')
    })
  })

  describe('test method: replaceClass', () => {
      test('succeeded to replace class', async () => {
        const div = document.createElement('div')
        div.className = 'blue red yellow'
        replaceClass(div, 'blue', 'orange')
        expect(div.className).toContain('orange')
        expect(div.className).toBe('orange red yellow')
      })
  })
})

