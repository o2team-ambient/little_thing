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
    this.config = window[O2_AMBIENT_CONFIG]
    this.init()
  }

  init () {
    this.create(red)
  }

  create () {  
    let wrap = this.wrap
    let animationData = STYLE[this.config['style']]
    let loop = this.config['loop']
    let scale = this.config['size']
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
    this.updateColor()
  }

  updateColor () {
    let matrix = this.rgbaToMatrix(this.config['color'])
    let svgDom = `<feColorMatrix type="matrix" color-interpolation-filters="sRGB" values="${matrix}">`
    let filterDom = document.getElementsByTagName('filter')[0]
    filterDom.innerHTML = svgDom
  }

  rgbaToMatrix (rgba) {
    if (!rgba instanceof Array) return
    const __toMatrixNum = (num) => {
      let total = 255
      return (num/total).toFixed(2) * 1
    }

    let r = __toMatrixNum(rgba[0])
    let g = __toMatrixNum(rgba[1])
    let b = __toMatrixNum(rgba[2])

    return `${r} 0 0 0 0 0 ${g} 0 0 0 0 0 ${b} 0 0 0 0 0 1 0`
  }
}