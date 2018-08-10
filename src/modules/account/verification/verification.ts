import { action, observable } from 'mobx'

export interface IPhotoJSON {
  attache: string
  description: string
}

export type PhotoStatus = '__wait_approval' | '__verified' | '__declined'

export interface VerificationJSON {
  attaches: IPhotoJSON[]
  id: number
  status: PhotoStatus
  userEmail: string
  userId: number
}

export type PhotoType = 'base64' | 'url'

export type VerificationObject = { [key: number]: { attache: string; description: string } | null }

export class Photo {
  @observable status: PhotoStatus | null
  @observable markedForDeletion: boolean
  description: string
  attache: string
  https?: boolean
  domain: string
  type: PhotoType

  constructor(json: IPhotoJSON, https?: boolean, domain?: string, status?: PhotoStatus | null, type?: PhotoType) {
    this.attache = json.attache
    this.description = json.description
    this.http.requests = https
    this.domain = domain || ''
    this.status = status || null
    this.markedForDeletion = false
    this.type = type || 'url'
  }

  get imageUrl() {
    const protocol = this.http.requests ? 'https://' : 'http://'
    return this.type === 'url' ? protocol + this.domain + this.attache : this.attache
  }

  @action
  markForDeletion() {
    this.markedForDeletion = true
  }

  @action
  setStatus(status: PhotoStatus) {
    this.status = status
  }
}