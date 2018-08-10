/**
 *  Object.omit
 *
 *  Returns a (shallow) copy of an object, with specified keys omitted.
 *
 *  @param object sourceObject
 *  @param string omitKeys, ...
 *
 *  @return object
 */
export function omit(sourceObject: Object, ...omitKeys: Array<string>) {
  let filteredObject: any = Object.assign({}, sourceObject)
  omitKeys.forEach(omitKey => {
    if (Object.keys(sourceObject).indexOf(omitKey) > -1) {
      delete filteredObject[omitKey]
    }
  })
  return filteredObject
}
