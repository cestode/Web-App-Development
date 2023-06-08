import { mount, flushPromises} from '@vue/test-utils'
import App from '../../src/App.vue'
import axios from 'axios'

const mockPostList = {
  data : JSON.stringify(
  [
    {pk : 1, fields : {short_link : "asfasfasfasfas", original_link:"afsfsf"}},
    {pk : 2, fields : {short_link : "asfasfasfasfas42", originalLink:"afsfsf"}},
  ])
}
// Following lines tell Jest to mock any call to `axios.get`
// and to return `mockPostList` instead
jest.spyOn(axios, 'get').mockResolvedValue(mockPostList)

describe('App', () => {
  
  it('initial loading', async () => {
    const wrapper = mount(App)
    
  await flushPromises()
  
    expect(axios.get).toHaveBeenCalledTimes(1)
    expect(axios.get).toHaveBeenCalledWith('/getAllLinksData')
  
  });

  it('renders correctly', () => {
    const wrapper = mount(App);
    expect(wrapper.exists()).toBe(true);
  });
  
});