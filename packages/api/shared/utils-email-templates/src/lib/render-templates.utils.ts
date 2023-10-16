import { Options, renderFile } from 'ejs'
import { join } from 'path'
import { PartialDeep } from 'type-fest'

export interface EmailTemplate {
  resetPassword: {
    resetPasswordUrl: string
    requestedByEmail: string
  }
}

export const GLOBAL_TEMPLATE_DEFAULTS = {
  backOfficeUrl: 'https://office.travell.app',
  unsubscribeEmail: 'https://travell.app/unsubscribe',
  supportUrl: 'https://travell.app/contact',
}
type GlobalTemplateDefaults = typeof GLOBAL_TEMPLATE_DEFAULTS

export const EMAIL_TEMPLATE_DEFAULTS: PartialDeep<EmailTemplate> = {
  resetPassword: {},
}

type FileLocationMap = { [key in keyof EmailTemplate]: string }
// TODO: Find better way of handling paths
export const FILE_LOCATIONS_MAP: FileLocationMap = {
  resetPassword: join(
    __dirname,
    '../../packages/api/shared/utils-email-templates/src/templates/reset-password.ejs'
  ),
}

/**
 * Renders EJS template to html.
 * @param template Email template to render
 * @param data Template required data
 * @param options EJS rendering options
 * @returns EJS rendered HTML
 */
export const renderEmailTemplate = async <T extends keyof EmailTemplate>(
  template: T,
  data: EmailTemplate[T] & PartialDeep<GlobalTemplateDefaults>,
  options?: Options & { fileLocation?: string }
) => {
  const fileLocation = options?.fileLocation || FILE_LOCATIONS_MAP[template]
  const templateDataDefaults = EMAIL_TEMPLATE_DEFAULTS[template]

  const html = await renderFile(
    fileLocation,
    { ...GLOBAL_TEMPLATE_DEFAULTS, ...templateDataDefaults, ...data },
    { ...options, async: true }
  )

  return html
}
