import './index.less'

import GameContorl from './modules/GameContorl'
const gameContorl = new GameContorl()
gameContorl.init()

const startEle = document.getElementById('start')
startEle?.addEventListener('click', () => {
  gameContorl.init()
})
