import { mount, flushPromises} from '@vue/test-utils'
import LinkView from '../../src/components/LinkView.vue'


describe('LinkView', () => {
  
  it('loading', async () => {
    const wrapper = mount(LinkView, {
        propsData : { id: 0, shortUrl : "testshort", url : "testurl"},
      })
      expect(wrapper.find('#shortLink').element.value).toBe("testshort")
      expect(wrapper.find('#url').element.value).toBe("testurl")
      wrapper.find('#url').setValue("changedURL")
      expect(wrapper.find('#url').element.value).toBe("changedURL")
  });

});
