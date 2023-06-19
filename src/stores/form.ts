import {defineStore} from 'pinia';
import {v4 as uuidv4} from 'uuid';
import {without} from 'ramda';

type StreamingService = {
  id: string;
  name: string;
  device: string;
};

export const useFormStore = defineStore('form', {
  state: () => ({
    currentFormValid: false,
    currentSectionProblems: [] as string[],
    data: {
      // Section 1
      firstname: '',
      lastname: '',
      email: '',
      address: '',
      zip: '',
      city: '',
      countryCode: null as null | string,
      phone: '',
      password: '',

      // Section 2
      categories: [] as string[],
      services: [] as StreamingService[],
      devices: [] as string[],

      // Section 5
      gender: null as number | null,
      incomeClass: null as null | number,
      sexualOrientation: null as null | number,
      birthdate: '',
      contactsAccess: null as null | boolean,
      subscribeToPremium: null as null | boolean,
      acceptTOS: false,
      receiveSpam: true,
    },
  }),
  actions: {
    addStreamingService() {
      this.data.services.push({id: uuidv4(), name: '', device: ''});
    },
    removeStreamingService(target: StreamingService) {
      this.data.services = this.data.services.filter((existing) => existing !== target);
    },
    toggleDevice(device: string) {
      if (this.data.devices.includes(device)) {
        this.data.devices = without([device], this.data.devices);
      } else {
        this.data.devices.push(device);
      }
    },
  },
});
