<template>
  <div>
    <h2>像素宽度</h2>
    <xMd :md="mdDoc" />
    <xTableEasy
      :columns="columns"
      :table-data="data"
      border-x
      border-y
      :row-height="40"
    />
  </div>
</template>

<script lang="ts">
export default async function () {
  return {
    data() {
      return {
        mdDoc: `通过在 columns 配置中设置 width 属性为像素值来定义列宽`,
        columns: [
          {
            field: 'name',
            title: 'Name',
            width: 100
          },
          {
            field: 'date',
            title: 'Date',
            width: 150
          },
          {
            field: 'hobby',
            title: 'Hobby',
            width: 200
          },
          {
            field: 'address',
            title: 'Address',
            width: 300
          }
        ],
        data: [
          {
            name: 'John',
            date: '2023-01-01',
            hobby: 'Reading',
            address: 'New York'
          },
          {
            name: 'Mike',
            date: '2023-01-02',
            hobby: 'Gaming',
            address: 'London'
          },
          {
            name: 'Lisa',
            date: '2023-01-03',
            hobby: 'Cooking',
            address: 'Paris'
          }
        ]
      };
    }
  };
}
</script>

<style lang="less">

</style>