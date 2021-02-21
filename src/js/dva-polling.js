/**
 * dva 中轮询
 * 在 dva 使用 计时器setTimeout 会报错
 * 场景: 从另一个modal中获取数据，可能只是获取到初始值，所以通过轮询来获取到最新值
 */

function * getDvaPolling({ payload }, { put }) {
        // 从另一个modal获取数据
        const {user} = yield select(state => state.user)

      // 轮询的原理来实现
      // 延时器
      const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

      // 用data判断是否还需要查询
      const check = (data) => {
        if (user) {
          // 操作拿到数据的操作
          
          return false
        }

        return true
      }

      const neeedToCheckAgain = check(user)

      if (neeedToCheckAgain) {
        yield delay(500)

        // 调用自身
        yield put({type: 'getDvaPolling'})
      }
}