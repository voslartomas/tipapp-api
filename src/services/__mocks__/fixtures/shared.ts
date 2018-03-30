export default {
  findAll: () => {
      return [
        {testdata: 'shared'},
      ]
  },
  findById: (id) => {
      if (id == 1) {
        return {update: (data) => {}, destroy: () => {}, testData: 'shared'}
      } else {
        return undefined
      }
  },
  findOne: (options) => {
      if (options.where.username == 'admin') {
        return 'done'
      } else {
        return undefined
      }
  },
  create: (data) => {
    return data
  }
}
