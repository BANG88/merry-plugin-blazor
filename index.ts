import { Plugin } from '@merryjs/cli/lib/plugin'
import path from 'path'
/**
 * BlazorAnswers
 */
export interface BlazorAnswers {
  name: string
}
export default (api: Plugin) => {
  api.command('blazor [name]').action(async (name: string) => {
    // define your own questions or remove it if you don't need it
    const answers = await api.prompt<BlazorAnswers>([
      {
        name: 'name',
        message: 'Your lib?',
        validate: blazorName => {
          if (!blazorName) {
            return 'blazor name are required'
          }
          return true
        },
        default: name,
      },
    ])
    const ns = 'AntDesign.'
    const prefix = 'Ant'
    const componentName = await api.compile(
      `${prefix}{{properCase name}}Component`,
      answers
    )
    const fullNamespace = await api.compile(`${ns}{{properCase name}}`, answers)

    const data = {
      ...answers,
      componentName,
      ns,
      prefix,
      fullCsproj: fullNamespace,
    }

    const proj = path.join(api.conf.dist, fullNamespace)

    // empty folder
    await api.fs.ensureDir(path.join(proj, 'content'))

    // razor
    await api.tmpl(
      'tpl/razor.tpl',
      path.join(proj, `${prefix}{{properCase name}}.razor`),
      data
    )
    // cs
    await api.tmpl('tpl/cs.tpl', path.join(proj, `${componentName}.cs`), data)

    // md
    await api.tmpl('tpl/md.tpl', path.join(proj, `README.md`), data)

    // csproj
    await api.tmpl(
      'tpl/csproj.tpl',
      path.join(proj, `${fullNamespace}.csproj`),
      data
    )

    const projs = await api.fs.readdir(api.conf.dist)

    api.log('Projects: %s', projs.join('\n'))
  })
}
