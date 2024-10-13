import { copyTemplate, getDest } from 'npm-init-helper'
import { join } from 'path'

async function main() {
  let dest = await getDest()
  console.log(`copying template to: ${dest} ...`)
  await copyTemplate({
    srcDir: join(__dirname, 'template'),
    dest,
  })
  console.log(
    `
created webapp-app template

Get started by typing:
  cd ${dest}
  code .
  npm install
  npm run dev

Then open index.html with the Live Server VSCode extension.

Or using alternative installer:
  pnpm install
  slnpm install
  yarn install
`.trim(),
  )
}
main().catch(e => console.error(e))
