/*
 * @desc 控制面板初始化代码
 * 注：控制面板自定义代码
 */

import dat from '@o2team/ambient-dat.gui'
import {
  O2_AMBIENT_MAIN,
  O2_AMBIENT_CONFIG,
  O2_AMBIENT_CLASSNAME
} from './utils/const'
import Controller from './utils/controller'
import { getParameterByName } from './utils/util'
import processLocalConfig from './utils/processLocalConfig'

import configKeys from './configs/keys'

/* eslint-disable no-unused-vars */
const isLoop = getParameterByName('loop')
const configKeyVal = getParameterByName('configKey')
const configKey = configKeys[configKeyVal] || configKeys['default']

const loadData = {
  '默认': {
    '0': {...window[O2_AMBIENT_CONFIG]}
  }
}
const allLoadData = processLocalConfig({ configKey, guiName: O2_AMBIENT_CLASSNAME, loadData })

let controlInit = () => {
  // 非必要配置字段（仅用于展示，如背景颜色、启动/暂停）
  class OtherConfig {
    constructor () {
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
      const gui = new dat.GUI({
        name: O2_AMBIENT_CLASSNAME,
        preset: configKey,
        load: {
          'remembered': { ...allLoadData.remembered }
        }
      })
      gui.remember(config)
      
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
        '圆形移动墨迹': 'red',
        '左侧烟雾': 'yellow',
        '大爆炸': 'cyan',
        '泼墨': 'blue',
        '右侧烟雾': 'purple'
      })
        .name('样式')
        .onFinishChange(val => {
          window[O2_AMBIENT_CONFIG].style = val
          // otherConfig.objectColor = COLOR
          // window[O2_AMBIENT_CONFIG].color = COLOR[val]
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
      texturesFolder.addGroup(config, 'textures').name(`纹理列表`).onFinishChange(val => {
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
