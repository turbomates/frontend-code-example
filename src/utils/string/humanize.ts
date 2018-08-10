export function humanize(property = '') {
  return property.replace(/_/g, ' ').replace(/(\w+)/g, function(match) {
    return match.charAt(0).toUpperCase() + match.slice(1)
  })
}
