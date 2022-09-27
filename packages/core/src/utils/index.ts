export const foramtAddress = (address: string, sub = 6) => {
  return address.substring(0, sub) + '...' + address.substring(address.length - sub, address.length)
}
