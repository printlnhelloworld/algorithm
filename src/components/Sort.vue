<template>
  <div class="wrap">
    <div class="arr">
      <el-input v-model="line" placeholder="请输入数组"></el-input>
      <el-button type="primary" @click="sort">排序</el-button>
    </div>
    <el-table
      :data="SortTime"
      style="width: 100%">
      <el-table-column
        type="expand"
        align="center"
        label="代码">
          <template slot-scope="props">
            <code><pre>{{ props.row._fn }}</pre></code>
          </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="排序类型"
        align="center">
      </el-table-column>
      <el-table-column
        align="center"
        prop="result"
        label="排序结果">
      </el-table-column>
      <el-table-column
        align="center"
        prop="flag"
        label="是否通过">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
function bubbleSort (arr) {
  let i = arr.length - 1;
  while (i > 0) {
    for (let j = 0; j < i; j++) {
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
    i--;
  }
  return arr;
}
function quickSort (arr) {
  if (arr.length <= 1) {
    return arr;
  }
  let pivotIndex = Math.floor(arr.length / 2);
  let pivot = arr.splice(pivotIndex, 1)[0];
  let left = [];
  let right = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  // return [...quickSort(left), pivot, ...quickSort(right)]
  return quickSort(left).concat([pivot], quickSort(right));
}
export default {
  name: 'HelloWorld',
  data () {
    return {
      line: '1,3,5,6,12,7',
      SortTime: [
        // {
        //   name: '冒泡排序',
        //   result: ''
        // }
      ]
    }
  },
  methods: {
    sort () {
      let _self = this;
      let arr = _self.arr;
      _self.SortTime.splice(0, _self.SortTime.length);
      let sortList = [
        {
          name: '冒泡排序',
          fn: bubbleSort,
          _fn: bubbleSort.toString()
        },
        {
          name: '快速排序',
          fn: quickSort,
          _fn: quickSort.toString()
        }
      ];
      console.log(sortList[1]._fn)
      for (const item of sortList) {
        console.time(item.name);
        let result = item.fn(arr);
        let flag = result.toString() === arr.toString() ? '通过' : '不通过';
        console.timeEnd(item.name);
        _self.SortTime.push({
          name: item.name,
          result: result.toString(),
          _fn: item._fn,
          flag: flag
        })
      }
    }
  },
  computed: {
    arr () {
      return this.line.split(',').map(item => parseInt(item))
    }
  },
  mounted () {
    document.title = 'Sort'
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wrap{
  height: 100%;
  padding: 0 20rem;
}
.arr{
  display: flex;
  justify-content: center;
}
.el-input{
  width: 20rem;
  flex: 0 1 auto;
}
</style>
