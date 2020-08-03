import { Model } from './base.js'

export class Disk extends Model {
  get defaults () {
    return {
      name: '',
      fullPath: '',
      type: '',
      spaceAvailable: '',
      spaceUsed: '',
      spaceTotal: ''
    }
  }
}
