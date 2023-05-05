import * as path from 'path'
import {fileURLToPath} from 'url'
import {dirname} from 'path'

export function getDirPath( url ) {
  const __filename = fileURLToPath( url )
  return dirname( __filename )
}

export function getFilePath( url, filename ) {
  const dirname = getDirPath( url )
  return path.resolve( dirname, filename )
}
