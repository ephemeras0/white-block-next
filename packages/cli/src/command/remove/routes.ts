import { File } from '@ephemeras/file'
import { resolve } from 'node:path'
import { PROJECT_ROOT, COMPONENT_ROUTES_DIR } from '../../constant'

export default async function (component: string) {
  ;['en', 'zh'].forEach(locale => {
    const configFile = new File(
      resolve(PROJECT_ROOT, `${COMPONENT_ROUTES_DIR}/${locale}.ts`),
      { generator: { retainLines: true } }
    )
    const SidebarComponents = configFile.get('SidebarComponents')
    const menus = SidebarComponents.json()
    menus.forEach((item: any, index: number) => {
      if (item.link.includes(component)) {
        menus.splice(index, 1)
      }
    })
    configFile.root().set('SidebarComponents', menus)
    configFile.save()
  })
}
