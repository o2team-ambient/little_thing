/*
 * @desc 控制面板初始化代码
 * 注：控制面板自定义代码
 */

import dat from '@o2team/ambient-dat.gui'
import {
  O2_AMBIENT_MAIN,
  O2_AMBIENT_CONFIG
} from './utils/const'
import Controller from './utils/controller'
import { getParameterByName } from './utils/util'

/* eslint-disable no-unused-vars */
const isLoop = getParameterByName('loop')

let controlInit = () => {
  // 非必要配置字段（仅用于展示，如背景颜色、启动/暂停）
  class OtherConfig {
    constructor () {
      this.message = '小元素'
      this.backgroundColor = '#ffffff'
      this.style = 'red'
      this.objectColor = [212, 54, 54]
      this.size = 'big'
      this.loop = true
    }
  }

  // 主控制面板
  class Control extends Controller {
    constructor () {
      super()
      this.otherConfig = new OtherConfig()
      this.initBaseGUI()
      // this.initTextureGUI() 
      this.isShowController && !this.isAmbientPlat && this.setBackgroundColor(this.otherConfig.backgroundColor)
    }

    initBaseGUI () {
      // demo code
      const config = this.config
      const otherConfig = this.otherConfig
      const gui = new dat.GUI()
      const COLOR = {
        red: [212, 54, 54],
        yellow: [228, 175, 40],
        green: [39, 231, 40],
        cyan: [71, 238, 209],
        blue: [34, 142, 241],
        purple: [222, 85, 208]
      }
      gui.add(otherConfig, 'message').name('配置面板')
      gui.add(otherConfig, 'loop').name('循环').onFinishChange(val => {
        window[O2_AMBIENT_CONFIG].loop = val
        this.resetCanvas()
      })
      gui.addCallbackFunc(this.resetCanvas.bind(this))
      let colorCtrl = gui.addColor(otherConfig, 'objectColor').name('颜色').onFinishChange(val => {        
        window[O2_AMBIENT_CONFIG].color = val
        this.resetCanvas()
      })
      gui.add(otherConfig, 'style', {
        '红色笔刷': 'red',
        '黄色笔刷': 'yellow',
        '绿色笔刷': 'green',
        '青色泡沫': 'cyan',
        '蓝色泼墨': 'blue',
        '紫色笔刷': 'purple'
      })
        .name('样式')
        .onFinishChange(val => {
          window[O2_AMBIENT_CONFIG].style = val
          otherConfig.objectColor = COLOR[val]
          window[O2_AMBIENT_CONFIG].color = COLOR[val]
          colorCtrl.updateDisplay()
          this.resetCanvas()
        })  
      gui.add(otherConfig, 'size', {
        '大': 'big',
        '中': 'middle',
        '小': 'small'
      })
        .name('尺寸')
        .onFinishChange(val => {
          window[O2_AMBIENT_CONFIG].size = val
          this.resetCanvas()
        })

      this.isShowController && !this.isAmbientPlat && gui.addColor(otherConfig, 'backgroundColor').name('背景色(仅演示)').onFinishChange(val => {        
        this.setBackgroundColor(val)
      })
      this.gui = gui
      // 设置控制面板层级
      this.setGUIzIndex(2)
    }

    initTextureGUI () {
      // demo code
      const gui = this.gui
      const config = this.config
      const texturesFolder = gui.addFolder('纹理')
      texturesFolder.add(config, 'textures').name(`纹理列表`).onFinishChange(val => {
        this.resetCanvas()
      })
      texturesFolder.open()

      this.texturesFolder = texturesFolder
    }
  }

  /* eslint-disable no-new */
  new Control()
}

export default controlInit
