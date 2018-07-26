import { O2_AMBIENT_CONFIG } from './utils/const'

import red from './json/data'
import yellow from './json/data2'
import green from './json/data3'
import cyan from './json/data4'
import blue from './json/data5'
import purple from './json/data6'

const STYLE = {
  'red': red,
  'yellow': yellow,
  'green': green,
  'cyan': cyan,
  'blue': blue,
  'purple': purple
}

export default class LittleThing {
  constructor () {
    this.wrap = document.getElementById('o2team_ambient_main')
    this.init()
  }

  init () {
    this.create(red)
  }

  create () {  
    let wrap = this.wrap
    let config = window[O2_AMBIENT_CONFIG]
    let animationData = STYLE[config['style']]
    let loop = config.loop
    let scale = config.size
    // 清空
    wrap.innerHTML = ''
    
    bodymovin.loadAnimation({
      animationData,
      renderer: 'svg',
      loop,
      autoplay: true,
      container: wrap
    })

    let scaleNum = scale === 'big' 
      ? 1
      : (scale === 'middle' 
        ? 0.6
        : 0.3)
    
    this.wrap.style.transform = `scale(${scaleNum})`
    this.wrap.style.webkitTransform = `scale(${scaleNum})`
  }

  reset () {   
    this.create()
  }
}