import {inheritProto} from '../../client/lib/inheritProto'

describe('test fn: inheritProto', () => {
  function Parent (name, age) {
    this.name = name
    this.age = age
  }

  Parent.prototype.getName = function (name) {
    return name
  }

  function Child (name, age, sex) {
    Parent.call(this, name, age)
    this.sex = sex
  }

  // 继承父类原型
  inheritProto(Parent, Child)

  Child.prototype.getSex = function () {
    return this.sex
  }


  test('Child has inherited Parent\'s attributes: name and age', async () => {
    const c1 = new Child('jm', 20, 'girl')
    expect(c1.name).toBe('jm')
    expect(c1.age).toBe(20)
  })

  test('Child has inherited Parent\'s methods: getName', async () => {
    const c1 = new Child('jm', 20, 'girl')
    expect(c1.getName('mm')).toBe('mm')
  })

  test('Child\'s method: getSex', async () => {
    const c1 = new Child('jm', 20, 'girl')
    expect(c1.getSex()).toBe('girl')
  })
})