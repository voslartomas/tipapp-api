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
      if (options.where.username === 'admin') {
        return 'done'
      } else if (options.where.username === 'tvoslar') {
        return {salt: '$2a$08$GCB7ZCn/DeNrO8gLbcfk7u', password: '$2a$08$GCB7ZCn/DeNrO8gLbcfk7uaeymwOjS4hYQu8nh9xJ5zG9jSAUR3DG'}
      } else {
        return undefined
      }
  },
  create: (data) => {
    return data
  }
}
