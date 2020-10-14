import { Injectable } from '@angular/core';
import { FormControlConfigBase, TextBoxFormConfigControl, RadioFormConfigControl } from '@/app/types/FormControlTypes'

interface IStackOperationConfig {
  title: string,
  controls: FormControlConfigBase[]
}

@Injectable({
  providedIn: 'root'
})
export class StackHandlerService {

  constructor() { }

  getAdditionConfig(): IStackOperationConfig {
    return {
      title: 'Add Items',
      controls: Array.of<FormControlConfigBase>(
        new TextBoxFormConfigControl({
          key: 'elements',
          label: 'Elements',
          value: '',
          placeholder: 'Ex. 1, 2, 3',
          required: true,
          validationPattern: /^[-\d, ]*$/
        })
      ).sort((a, b) => a.order - b.order)
    }
  }

  getRemovingConfig(): IStackOperationConfig {
    return { 
      title: 'Remove Last',
      controls: Array.of<FormControlConfigBase>(
        new TextBoxFormConfigControl({
          key: 'quantity',
          label: 'Number of elements to delete',
          value: '',
          placeholder: 'Ex. 1',
          required: true,
          validationPattern: /^-?\d+$/
        })
      ).sort((a, b) => a.order - b.order)
    }
  }

  getSwappingConfig(): IStackOperationConfig {
    return {
      title: 'Swap Items',
      controls: Array.of<FormControlConfigBase>(
        new TextBoxFormConfigControl({
          key: 'firstElementPosition',
          label: 'First element position',
          value: '',
          placeholder: 'Ex. 1',
          required: true,
          validationPattern: /^-?\d+$/,
          order: 1
        }),

        new RadioFormConfigControl({
          key: 'firstElementPositionRadio',
          label: 'Custom',
          value: 'Custom',
          order: 2
        }),

        new RadioFormConfigControl({
          key: 'firstElementPositionRadio',
          label: 'Beginning',
          value: 'Beginning',
          order: 3
        }),

        new RadioFormConfigControl({
          key: 'firstElementPositionRadio',
          label: 'End',
          value: 'End',
          order: 4
        }),
  
        new TextBoxFormConfigControl({
          key: 'secondElementPosition',
          label: 'Second element position',
          value: '',
          placeholder: 'Ex. 1',
          required: true,
          validationPattern: /^-?\d+$/,
          order: 5
        }),

        new RadioFormConfigControl({
          key: 'secondElementPositionRadio',
          label: 'Custom',
          value: 'Custom',
          order: 6
        }),

        new RadioFormConfigControl({
          key: 'secondElementPositionRadio',
          label: 'Beginning',
          value: 'Beginning',
          order: 7
        }),

        new RadioFormConfigControl({
          key: 'secondElementPositionRadio',
          label: 'End',
          value: 'End',
          order: 8
        }),
      ).sort((a, b) => a.order - b.order)
    }
  }

  getPresenceCheckConfig(): IStackOperationConfig {
    return {
      title: 'Check item',
      controls: Array.of<FormControlConfigBase>(
        new TextBoxFormConfigControl({
          key: 'element',
          label: 'Element',
          value: '',
          placeholder: 'Ex. 1',
          required: true,
          validationPattern: /^-?\d+$/,
          order: 1
        })
      )
    }
  }
}
