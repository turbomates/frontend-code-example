export function parametrize(template: string, parameters: { [key: string]: string }) {
  return Object.keys(parameters).reduce((result, param) => {
    result = result.replace(param, parameters[param])
    return result
  }, template)
}
