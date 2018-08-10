import { Language } from './language'

const languages = Language.getTranslations()

export const statics = [
  't.my_account',
  'not verificated',
  't.account_overview',
  't.balance_overview',
  't.change_password',
  't.verification',

  // Registration
  't.registration_complete_title',
  't.registration_complete_message',
  't.email',
  't.password',
  't.log_in',

  // Languages
  ...languages,

  /* Account overview */
  't.overview_username',
  't.overview_lastName',
  't.overview_firstName',
  't.overview_code',
  't.overview_email',
  't.overview_phone',
  't.overview_country',
  't.overview_state',
  't.overview_city',
  't.overview_street',
  't.overview_currency',
  't.overview_zip',
  't.edit_profile',
  't.save_changes',
  't.cancel',

  /* Password change */
  't.password_change',
  't.old_password',
  't.new_password',
  't.repeat_password',
  't.change',

  /* Account verification */
  't.photoStatuses.null',
  't.photoStatuses.__wait_approval',
  't.photoStatuses.__verified',
  't.photoStatuses.__declined',
  't.status',
  't.select_file',
  'agreement',
]
