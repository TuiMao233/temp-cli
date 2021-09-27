import { castArray } from 'lodash'
import qs from 'qs'

/**
 * 处理文件的名称的参数
 * @param string_
 */
export const parseFileParmas = (string_: string) => {
  const matchs = (string_.match(/\^([^\\]*)\$/g) || [])
    .flatMap((string_) => string_.replace(/\^|\$/g, ''))
    .join('&')
  const parmas = qs.parse(matchs, { comma: true })
  return {
    includes: castArray(parmas.includes).filter(Boolean) as string[]
  }
}

/**
 * 比较 to 的数值是否在 from 都存在
 * @param from
 * @param to
 */
export const compareIncludes = (from: any[], to: any[]) => {
  for (const _value of to) {
    if (from.includes(_value)) continue
    return false
  }
  return true
}
