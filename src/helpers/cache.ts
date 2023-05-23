import * as fs from 'fs'

/**
 * Set cache
 * @param {*} key
 * @param {*} data
 */
export const setCache = async (key: string, data: any) => {
  return fs.promises.writeFile(`cache-${key}.json`, JSON.stringify(data))
}

/**
 * Check cache
 * @param {*} key
 */
export const hasCache = async (key: string) => {
  const file = `cache-${key}.json`
  return fs.existsSync(file)
}

/**
 * Get cache
 * @param {*} key
 */
export const getCache = async (key: string) => {
  const file = `cache-${key}.json`
  const data = fs.readFileSync(file, 'utf8')
  return JSON.parse(data)
}
