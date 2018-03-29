export default class Database {
  public models = {
    User: {
      findAll: () => {
        return new Promise((resolve, reject) => {
          resolve([])
        })
      },
      findById: (id) => {
        return new Promise((resolve, reject) => {
          if (id == 1) {
            resolve('done')
          } else {
            reject()
          }
        })
      }
    }
  }

  constructor() {

  }

  sync() {
    return new Promise((resolve, reject) => {
      resolve('done')
    })
  }
}
