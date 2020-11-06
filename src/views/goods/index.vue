<template>
  <div class="main-wrapper">
    <section class="blog-content">
      <el-row type="flex" justify="center">
        <el-col :xs="22" :sm="18" :md="16" :lg="16" :xl="14">
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="分类" label-width="120px">
              <el-radio-group v-model="form.optId">
                <el-radio-button :label="0">全部</el-radio-button>
                <el-radio-button :label="9564">手机</el-radio-button>
                <el-radio-button :label="16">美妆</el-radio-button>
                <el-radio-button :label="9689">数码</el-radio-button>
                <el-radio-button :label="18">电器</el-radio-button>
                <el-radio-button :label="4">母婴</el-radio-button>
                <el-radio-button :label="15">百货</el-radio-button>
                <el-radio-button :label="1">食品</el-radio-button>
                <el-radio-button :label="818">家纺</el-radio-button>
                <el-radio-button :label="1451">运动</el-radio-button>
                <el-radio-button :label="-1002">必买清单</el-radio-button>
                <el-radio-button :label="-1001">佳琦薇娅</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="价格最小值" label-width="120px">
              <el-input v-model="form.goodsFactPriceMin" placeholder="请输入价格最小值" />
            </el-form-item>
            <el-form-item label="价格最大值" label-width="120px">
              <el-input v-model="form.goodsFactPriceMax" placeholder="请输入价格最大值" />
            </el-form-item>
            <el-form-item label-width="120px">
              <el-button type="primary" @click="onSubmit">提交</el-button>
              <el-button>重置搜索条件</el-button>
            </el-form-item>
          </el-form>
          <el-pagination
            small
            layout="prev, pager, next"
            :page-size="20"
            :current-page="page"
            :total="total"
            @current-change="handleCurrentChange"
          />
          <el-table
            :data="list"
            style="width: 100%"
          >
            <el-table-column
              prop="goodsName"
              label="商品名"
              width="150"
            />
            <el-table-column
              label="图片"
              width="120"
            >
              <template slot-scope="scope">
                <el-image
                  :src="scope.row.goodsPic"
                  fit="fill"
                />
              </template>
            </el-table-column>
            <el-table-column
              prop="minOnSaleNormalPrice"
              label="原价"
              width="100"
            />
            <el-table-column
              prop="goodsFactPrice"
              label="活动价"
              width="80"
            />
            <el-table-column
              prop="couponPrice"
              label="补贴"
              width="50"
            />
            <el-table-column
              prop="discount"
              label="折扣力度"
              width="80"
            />
            <el-table-column
              prop="price"
              label="最终折后价"
              width="120"
            />
          </el-table>
        </el-col>
      </el-row>
    </section>
  </div>
</template>

<script>
import { fetchList } from '@/api/goods'

export default {
  name: 'Goods',
  data() {
    return {
      form: {
        optId: 0,
        goodsFactPriceMax: 0,
        goodsFactPriceMin: 0
      },
      list: [],
      page: 1,
      total: 0
    }
  },
  created() {
    this.getList()
  },
  methods: {
    onSubmit() {
      this.getList()
    },
    async getList() {
      const {
        data: { total, current_page, data }
      } = await fetchList(
        this.form.optId,
        this.form.goodsFactPriceMax * 100,
        this.form.goodsFactPriceMin * 100,
        this.page)

      data.map((item) => {
        item.price = item.goodsFactPrice - item.couponPrice
        item.discount = (item.price / item.minOnSaleNormalPrice).toFixed(2) * 100 + '%'
        item.goodsFactPrice /= 100
        item.couponPrice /= 100
        item.price /= 100
        item.minOnSaleNormalPrice /= 100
      })

      console.log(data)
      console.log(this.page)
      console.log(total)
      this.total = total
      this.page = current_page
      this.list = data
    },
    handleCurrentChange(val) {
      this.page = val
      this.getList()
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/post.scss";
</style>
