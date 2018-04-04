const czechMobileNumber = /^[6-7][0-9]{8}$/
// DateTime ISO string (2018-04-04T12:59:55.776Z)
const dateTimeRegex = /^(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+)|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d)|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d)$/

export const isBoolean = (value) => {
  if (typeof (value) !== 'boolean') {
    throw new Error(`${value} is not a boolean.`)
  }
}

export const isString = (value) => {
  if (!(typeof value === 'string' || value instanceof String)) {
    throw new Error(`${value} is not a string.`)
  }
}

export const isNumeric = (value) => {
  if (Number(parseInt(value)) !== value) {
    throw new Error(`${value} is not a numeric.`)
  }
}

export const isCzechMobileNumber = (value) => {
  const re = new RegExp(czechMobileNumber)
  if (!re.test(value)) {
    throw new Error(`${value} is not valid mobile number (XXXYYYYYY).`)
  }
}

export const isDate = (value) => {
  const iso = value.toISOString()
  const re = new RegExp(dateTimeRegex)
  if (!re.test(iso)) {
    throw new Error(`${value} is not valid datetime.`)
  }
}