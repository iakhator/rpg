import {
  shallowMount,
  mount,
  createLocalVue
} from '@vue/test-utils'
import Antd from 'ant-design-vue'
import RandomPhoneNumber from '@/components/RandomPhoneNumber'
import RandomNumberDisplay from '@/components/RandomNumberDisplay'

const localVue = createLocalVue()
localVue.use(Antd)

describe('RandomNumberdisplay', () => {
  it('is a Vue instance', () => {
    const wrapper = mount(RandomPhoneNumber, {
      localVue
    })
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('should generate a random number of length 3 when generateRandomNumber is called', () => {
    const wrapper = shallowMount(RandomPhoneNumber, {
      localVue
    })
    const randomNumber = wrapper.vm.generateRandomNumber(3).toString()
    expect(randomNumber.length).toEqual(3)
  })

  it('should generate a random number of length 3 if the parameter pass to generateRandomNumber is greater the the length of 3', () => {
    const wrapper = shallowMount(RandomPhoneNumber, {
      localVue
    })
    const randomNumber = wrapper.vm.generateRandomNumber(7).toString()
    expect(randomNumber.length).toEqual(3)
  })

  it('should generate a random number of length 10 when generateFullPhone is called', () => {
    const wrapper = shallowMount(RandomPhoneNumber, {
      localVue
    })
    const generateFullPhone = wrapper.vm.generateFullPhone()
    expect(generateFullPhone.length).toEqual(10)
  })

  it('does not display child component', () => {

    const wrapper = mount(RandomPhoneNumber, {
      localVue,
      sync: false
    })

    expect(wrapper.find(RandomNumberDisplay).exists()).toBe(false)
  })

  it('render RandomNumberDisplay Child component', () => {

    const mockValues = [{
      id: 1,
      phoneNo: '08074656332'
    }, {
      id: 2,
      phoneNo: '070763535343'
    }]

    const wrapper = shallowMount(RandomPhoneNumber, {
      localVue,
      sync: false,
      data () {
        return {
          phoneNumbers: mockValues
        }
      }
    })
    expect(wrapper.find(RandomNumberDisplay).exists()).toBe(true)
  })
  it('call generaPhone method', () => {
    const generatePhone = jest.fn()
    const wrapper = mount(RandomPhoneNumber, {
      localVue,
      sync: false,
      value: 1
    })

    generatePhone()
    const button = wrapper.find('.btn-generate')
    button.trigger('click')

    expect(generatePhone).toHaveBeenCalled()
  })

  it('return TRUE if number size is greater than 0', () => {

    const mockValues = [{
      id: 1,
      phoneNo: '08074656332'
    }, {
      id: 2,
      phoneNo: '070763535343'
    }]

    const wrapper = mount(RandomPhoneNumber, {
      localVue,
      sync: false,
      data () {
        return {
          phoneNumbers: mockValues
        }
      }
    })

    const result = wrapper.vm.numberSize
    expect(result).toEqual(true)
  })

  it('return sorted phoneNumbers correctly both in `Ascending and Descending order by PhoneNo`', () => {

    const mockValues = [{
      id: 1, phoneNo: '08074656332'
    }, {
      id: 2, phoneNo: '070763535343'
    }]

    const wrapper = shallowMount(RandomPhoneNumber, {
      localVue,
      sync: false,
      data () {
        return {
          phoneNumbers: mockValues
        }
      }
    })

    expect(wrapper.vm.sortByAsc()).toEqual([{
      id: 2,
      phoneNo: '070763535343'
    }, {
      id: 1,
      phoneNo: '08074656332'
    }])
    expect(wrapper.vm.sortByDesc()).toEqual([{
      id: 1, phoneNo: '08074656332'
    }, {
      id: 2,
      phoneNo: '070763535343'
    }])
  })

  it('should save phone number', () => {
    const savePhoneNumbers = jest.fn()
    const mockValues = [{
      id: 1,
      phoneNo: '08074656332'
    }, {
      id: 2,
      phoneNo: '070763535343'
    }]
    window.URL = {
      createObjectURL: () => {}
    }
    const wrapper = mount(RandomPhoneNumber, {
      localVue,
      sync: false,
      data () {
        return {
          phoneNumbers: mockValues
        }
      }
    })

    savePhoneNumbers(mockValues)
    const btnNumbers = wrapper.find('.saveNumbers')
    btnNumbers.trigger('click')
    expect(savePhoneNumbers).toBeCalledWith(mockValues)
  })

  it('should return minimum and maximum number', () => {
    const mockValues = [{
      id: 1,
      phoneNo: '08074656332'
    }, {
      id: 2,
      phoneNo: '070763535343'
    }]

    const wrapper = mount(RandomPhoneNumber, {
      localVue,
      sync: false,
      data () {
        return {
          phoneNumbers: mockValues
        }
      }
    })
    expect(wrapper.vm.getMinimumNumber).toEqual(mockValues[1].phoneNo)
    expect(wrapper.vm.getMaximumNumber).toEqual(mockValues[0].phoneNo)
  })
})
