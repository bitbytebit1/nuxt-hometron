import { Model } from './base.js'

export class File extends Model {
  get defaults () {
    return {
      name: '',
      extension: '',
      fullPath: '',
      fullName: '',
      path: '',
      size: '',
      created: '',
      modified: '',
      isFile: false,
      isDirectory: false
    }
  }
}
