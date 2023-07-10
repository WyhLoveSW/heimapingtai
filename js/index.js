//判断公共的 token有没有的函数
getKoken()
//回显用户名的函数
showUsername()
//退出登录的函数
logout()
//渲染统计数据 获取数据 渲染到页面上
const getData = async () => {
  const { data: { overview, year } } = await axios.get('/dashboard')
  renderOverview(overview)
  renderYear(year)
}
getData()

const renderOverview = (overview) => {
  // 在这里使用 Object.keys() 方法
  Object.keys(overview).forEach(item => {
    document.querySelector(`.${item}`).innerHTML = overview[item]
  })
}

// 柱状图
const renderYear = (year) => {
  console.log(year);
  var myChart = echarts.init(document.querySelector('#line'))
  option = {
    title: {
      text: '2022全学科走势',
      left: 10,
      top: 10,
    },
    xAxis: {
      type: 'category',
      data: year.map(item => item.month),
      axisLine: {
        lineStyle: { type: 'dashed', color: '#cccccc' }
      }
    },
    grid: {
      top: '20%',
    },
    yAxis: {
      type: 'value',
      splitline: {
        lineStyle: 'dashed'
      }
    },
    series: [
      {
        data: year.map(item => item.salary),
        type: 'line',
        smooth: true,
        areaStyle: {},
        symbolSize: 5,
        lineStyle: {
          width: 4,
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              // 0% 处的颜色
              { offset: 0, color: 'red' },
              // 50% 处的颜色
              // { offset: 0.5, color: 'yellow' },
              // 100% 处的颜色
              { offset: 1, color: 'white' }],
            global: false // 缺省为 false
          }
        },
        //区域样式 
        areaStyle: {
          //渐变色
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              // 0% 处的颜色
              { offset: 0, color: 'red' },
              // 50% 处的颜色
              // { offset: 0.5, color: 'yellow' },
              // 100% 处的颜色
              { offset: 1, color: 'white' }],
            global: false // 缺省为 false
          }
        }
      }
    ],
    // color: [
    //   {
    //     type: 'linear',
    //     x: 0,
    //     y: 0,
    //     x2: 0,
    //     y2: 1,
    //     colorStops: [
    //       // 0% 处的颜色
    //       { offset: 0, color: 'red' },
    //       // 50% 处的颜色
    //       // { offset: 0.5, color: 'yellow' },
    //       // 100% 处的颜色
    //       { offset: 1, color: 'white' }],
    //     global: false // 缺省为 false
    //   }
    // ]
  }
  myChart.setOption(option)
}