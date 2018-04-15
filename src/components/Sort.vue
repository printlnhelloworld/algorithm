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
        prop="timeComplexity"
        label="时间复杂度">
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
  let pivot = arr[0];
  let left = [];
  let right = [];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  // return [...quickSort(left), pivot, ...quickSort(right)]
  return quickSort(left).concat([pivot], quickSort(right));
}
function selectSort (arr) {
  // let array = [...arr];
  let array = arr.slice(0);
  let length = array.length;
  for (let i = 0; i < length; i++) {
    let minIndex = i;
    for (let j = i + 1; j < length; j++) {
      if (array[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    let temp = array[i];
    array[i] = array[minIndex];
    array[minIndex] = temp;
  }
  return array;
}
function mergingSort (arr) {
  let array = arr.slice(0);
  const merge = function (left, right) {
    let result = [];
    while (left.length || right.length) {
      if (left.length && right.length) {
        if (left[0] < right[0]) {
          result.push(left.shift());
        } else {
          result.push(right.shift());
        }
      } else if (left.length) {
        result = result.concat(left.splice(0, left.length));
      } else {
        result = result.concat(right.splice(0, right.length));
      }
    }
    return result;
  }
  const sort = function (array) {
    let length = array.length;
    if (length === 1) {
      return array;
    }
    let mid = Math.floor(length / 2);
    let left = array.slice(0, mid);
    let right = array.slice(mid, length);
    return merge(sort(left), sort(right));
  }
  return sort(array);
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
          timeComplexity: 'O(n^2)',
          fn: bubbleSort,
          _fn: bubbleSort.toString()
        },
        {
          name: '快速排序',
          timeComplexity: 'O(nlogn)',
          fn: quickSort,
          _fn: quickSort.toString()
        },
        {
          name: '选择排序',
          timeComplexity: 'O(n^2)',
          fn: selectSort,
          _fn: selectSort.toString()
        },
        {
          name: '归并排序',
          timeComplexity: 'O(nlogn)',
          fn: mergingSort,
          _fn: mergingSort.toString()
        }
      ];
      for (const item of sortList) {
        console.time(item.name);
        let result = item.fn(arr);
        let flag = result.toString() === arr.toString() ? '通过' : '不通过';
        console.timeEnd(item.name);
        _self.SortTime.push({
          name: item.name,
          result: result.toString(),
          timeComplexity: item.timeComplexity,
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
    document.title = 'Sort';
    this.sort();
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
