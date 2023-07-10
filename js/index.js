//判断公共的 token有没有的函数
getKoken()
//回显用户名的函数
showUsername()
//退出登录的函数
logout()
//渲染统计数据 获取数据 渲染到页面上
const getData = async () => {
  const res = await axios.get('/dashboard')
  console.log(res);
  const { data: { overview, year, salaryData, provinceData, groupData } } = res
  renderOverview(overview)
  renderYear(year)
  renderSalaryData(salaryData)
}
getData()

const renderOverview = (overview) => {
  // 在这里使用 Object.keys() 方法
  Object.keys(overview).forEach(item => {
    document.querySelector(`.${item}`).innerHTML = overview[item]
  })
}

const renderSalaryData = (salaryData) => {

  var myChart = echarts.init(document.querySelector('#salary'))
  option = {
    tooltip: {
      trigger: 'item'
    },
    title: {
      text: '班级薪资分布',
      left: 10,
      top: 10,
    },
    legend: {
      bottom: '5%',
      left: 'center'
    },
    series: [
      {
        name: '班级薪资分布',
        type: 'pie',
        radius: ['40%', '50%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        //提升文字
        label: {
          show: false,
          position: 'center'
        },
        //高亮的扇区样式
        // emphasis: {
        //   label: {
        //     show: true,
        //     fontSize: 40,
        //     fontWeight: 'bold'
        //   }
        // },
        //连接线
        labelLine: {
          show: false
        },
        data: salaryData.map(item => ({
          value: item.b_count + item.g_count,
          name: item.label
        }))

      }
    ],
    color: ['#fda224', '#5097ff', '#3abcfa', '#34d39a']
  }
  myChart.setOption(option)
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
    tooltip: {
      show: true,
      trigger: 'axis',
    }
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