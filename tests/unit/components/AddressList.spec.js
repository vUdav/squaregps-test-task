import AddressList from "@/components/AddressList.vue";

import { shallowMount } from "@vue/test-utils";
import createTestVue from "../createTestVue";

const createWrapper = (component, options = {}) => {
  const { localVue, i18n, vuetify, router } = createTestVue();

  return shallowMount(component, {
    localVue,
    i18n,
    vuetify,
    router,
    ...options,
    propsData: {
      ...options.propsData,
    },
  });
};

describe("AddressList", () => {
  it("render", () => {
    const wrapper = createWrapper(AddressList);

    expect(wrapper.exists()).toBe(true);
  });

  it("renders a list of addresses", () => {
    const wrapper = createWrapper(AddressList, {
      propsData: {
        list: [
          { id: 1, address: "123 Main St" },
          { id: 2, address: "456 Elm St" },
        ],
      },
    });

    const addressList = wrapper.findAll("v-list-item-stub");

    expect(addressList.length).toBe(2);
    expect(addressList.at(0).text()).toContain("123 Main St");
    expect(addressList.at(1).text()).toContain("456 Elm St");
  });

  describe("renders an empty message when the list is empty", () => {
    it("renders a list of addresses", () => {
      const wrapper = createWrapper(AddressList, {
        propsData: {
          list: [],
        },
      });

      const emptyMessage = wrapper.find("v-alert-stub");

      expect(emptyMessage.text()).toContain(
        "У вас нет ни одного добавленного маркера"
      );
    });
  });
});
