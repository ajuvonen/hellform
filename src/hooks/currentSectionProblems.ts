import {storeToRefs} from 'pinia';
import {useFormStore} from '@/stores/form';
import {onMounted} from 'vue';

export function useCurrentSectionProblems(problems: string[]) {
  const {currentSectionProblems} = storeToRefs(useFormStore());
  onMounted(() => {
    currentSectionProblems.value = problems;
  });
}
