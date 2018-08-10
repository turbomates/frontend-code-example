import { action, observable, IObservableArray } from 'mobx'
import { ConfigStore, HttpStore } from 'core'

import { Photo, VerificationJSON, VerificationObject } from './verification'

export class AccountVerificationStore {
  @observable text: string | null = null
  @observable textLoaded: boolean = false
  @observable private _photos: IObservableArray<Photo> = observable([])

  @observable file: string = ''
  @observable agreement: boolean = false

  constructor(private config: ConfigStore, private http: HttpStore) {}

  get photos() {
    return this._photos.filter(photo => !photo.markedForDeletion).reverse()
  }

  loadText() {
    this.http.request
      .get('document/page/verification')
      .then(resp => this.saveText(resp.data.text))
      .catch(() => this.saveText(''))
  }

  @action
  saveText(text: string) {
    this.text = text
    this.textLoaded = true
  }

  loadPhotos() {
    this.http.request
      .get('player/verify/information')
      .then(resp => this.savePhotos(resp.data as VerificationJSON))
      .catch(e => console.log('Verification photos loading error: ', e))
  }

  @action
  savePhotos(data: VerificationJSON) {
    const https = this.config.data.https
    const domain = this.config.data.domain

    this._photos = observable(data.attaches.map(attache => new Photo(attache, https, domain, data.status)))
  }

  @action
  toggleAgreement() {
    this.agreement = !this.agreement
  }

  @action
  add(attache: string) {
    const https = this.config.data.https
    const domain = this.config.data.domain

    this._photos.push(new Photo({ attache, description: '' }, https, domain, null, 'base64'))
  }

  @action
  updatePhotos() {
    this._photos.slice().forEach((photo, index) => {
      if (photo.markedForDeletion) this._photos.remove(photo)
      if (photo.status === null) photo.setStatus('__wait_approval')
    })
  }

  handleError(error: any) {
    const { data } = error.response
    const errors = Object.keys(data).filter(key => data[key][0].message)

    if (errors && errors.length) {
      errors.forEach(err => console.error(`${err}: ${data[err][0].message}`))
    } else {
      console.error('Something went wrong. Please check your data')
    }
  }

  send() {
    const attaches = this._photos.reduce(
      (object, photo, index) => {
        if (!photo.markedForDeletion) {
          const { attache, description, status } = photo
          const photoObject = status !== null ? null : { attache, description }
          object[index] = photoObject
        }

        return object
      },
      {} as VerificationObject
    )

    this.http.request
      .post('player/verify', { verification_api: { attaches, agreement: this.agreement } })
      .then(() => this.updatePhotos())
      .catch(this.handleError)
  }
}
