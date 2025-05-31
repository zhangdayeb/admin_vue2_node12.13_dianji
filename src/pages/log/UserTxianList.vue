<template>
  <div class='page-content'>
    <table-bar :showTop="false" :columns="columns" @changeColumn="changeColumn">
      <div slot="top">
        <el-form label-width="80px">
          <!-- 第一行搜索条件 -->
          <el-row :gutter="20">
            <el-col :xs="24" :sm="12" :lg="6">
              <el-form-item label="用户名：">
                <el-input v-model="searchForm.username" placeholder="请输入用户名" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :lg="6">
              <el-form-item label="用户ID：">
                <el-input v-model="searchForm.userId" placeholder="请输入用户ID" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :lg="6">
              <el-form-item label="手机号：">
                <el-input v-model="searchForm.phone" placeholder="请输入手机号" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :lg="6">
              <el-form-item label="提现状态：">
                <el-select v-model="searchForm.status" clearable placeholder="请选择状态" style="width: 100%">
                  <el-option label="待审核" value="0"></el-option>
                  <el-option label="已通过" value="1"></el-option>
                  <el-option label="已拒绝" value="2"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          
          <!-- 第二行搜索条件 -->
          <el-row :gutter="20">
            <el-col :xs="24" :sm="12" :lg="6">
              <el-form-item label="支付方式：">
                <el-select v-model="searchForm.payType" clearable placeholder="请选择支付方式" style="width: 100%">
                  <el-option label="USDT-TRC20" value="usdt"></el-option>
                  <el-option label="汇旺" value="huiwang"></el-option>
                  <el-option label="ABA银行" value="aba"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :lg="6">
              <el-form-item label="申请时间：">
                <el-date-picker
                  v-model="searchForm.dateRange"
                  type="datetimerange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  style="width: 100%">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :lg="6">
              <el-form-item label="金额范围：">
                <el-input-number v-model="searchForm.minAmount" placeholder="最小金额" style="width: 48%"></el-input-number>
                <span style="margin: 0 2%">-</span>
                <el-input-number v-model="searchForm.maxAmount" placeholder="最大金额" style="width: 48%"></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :lg="6">
              <el-form-item label="审核员：">
                <el-input v-model="searchForm.adminName" placeholder="请输入审核员" clearable></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          
          <!-- 第三行操作按钮 -->
          <el-row :gutter="20">
            <el-col :span="24" style="text-align: right;">
              <el-button type="primary" @click="handleSearch">搜索</el-button>
              <el-button @click="handleReset">重置</el-button>
              <el-button type="success" plain @click="handleExport">导出</el-button>
            </el-col>
          </el-row>
        </el-form>
      </div>
      
      <div slot="bottom">
        <el-button type="primary" plain @click="handleBatchApprove" :disabled="!selectedRows.length">
          批量审核通过
        </el-button>
        <el-button type="danger" plain @click="handleBatchReject" :disabled="!selectedRows.length">
          批量拒绝
        </el-button>
        <el-button @click="handleRefresh">刷新</el-button>
        <span style="margin-left: 10px; color: #909399;">
          已选择 {{ selectedRows.length }} 条记录
        </span>
      </div>
    </table-bar>
    
    <tao-table :data="filteredList" :showPage="true" ref="table" @selection-change="handleSelectionChange">
      <!-- 选择列 -->
      <el-table-column type="selection" width="55" align="center"></el-table-column>
      
      <!-- 用户信息 -->
      <el-table-column label="用户信息" width="120" v-if="columns[0].show">
        <template slot-scope="scope">
          <div class="user-info">
            <div class="username">{{ scope.row.userName }}</div>
            <div class="user-id">ID: {{ scope.row.uId }}</div>
          </div>
        </template>
      </el-table-column>
      
      <!-- 提现金额 -->
      <el-table-column label="提现金额" prop="money" width="120" v-if="columns[1].show">
        <template slot-scope="scope">
          <div class="amount-info">
            <div class="main-amount">${{ scope.row.money }}</div>
          </div>
        </template>
      </el-table-column>
      
      <!-- 手续费 -->
      <el-table-column label="手续费" prop="moneyFee" width="100" v-if="columns[2].show">
        <template slot-scope="scope">
          <span class="fee-amount">-${{ scope.row.moneyFee }}</span>
        </template>
      </el-table-column>
      
      <!-- 实际到账 -->
      <el-table-column label="实际到账" prop="momeyActual" width="120" v-if="columns[3].show">
        <template slot-scope="scope">
          <span class="actual-amount">${{ scope.row.momeyActual }}</span>
        </template>
      </el-table-column>
      
      <!-- 收款信息 -->
      <el-table-column label="收款信息" width="200" v-if="columns[4].show">
        <template slot-scope="scope">
          <div class="payment-info">
            <div class="pay-type">
              <el-tag size="mini" :type="getPayTypeColor(scope.row.payType)">
                {{ getPayTypeName(scope.row.payType) }}
              </el-tag>
            </div>
            <div class="account-info">
              <span>{{ scope.row.uBankName }}</span><br>
              <span class="account-number">{{ scope.row.uBackCard }}</span>
            </div>
          </div>
        </template>
      </el-table-column>
      
      <!-- 申请时间 -->
      <el-table-column label="申请时间" prop="createTime" width="160" v-if="columns[5].show">
        <template slot-scope="scope">
          {{ formatDateTime(scope.row.createTime) }}
        </template>
      </el-table-column>
      
      <!-- 状态 -->
      <el-table-column label="状态" prop="status" width="100" v-if="columns[6].show">
        <template slot-scope="scope">
          <el-tag size="mini" :type="getStatusType(scope.row.status)">
            {{ getStatusText(scope.row.status) }}
          </el-tag>
        </template>
      </el-table-column>
      
      <!-- 审核时间 -->
      <el-table-column label="审核时间" prop="successTime" width="160" v-if="columns[7].show">
        <template slot-scope="scope">
          {{ scope.row.successTime ? formatDateTime(scope.row.successTime) : '-' }}
        </template>
      </el-table-column>
      
      <!-- 操作列 -->
      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="text" icon="el-icon-view" @click="showDetail(scope.row)">
            详情
          </el-button>
          <el-button 
            v-if="scope.row.status === 0" 
            type="text" 
            icon="el-icon-check" 
            style="color: #67C23A"
            @click="showApproveDialog(scope.row)">
            审核
          </el-button>
          <el-button 
            v-if="scope.row.status === 0" 
            type="text" 
            icon="el-icon-close" 
            style="color: #F56C6C"
            @click="showRejectDialog(scope.row)">
            拒绝
          </el-button>
        </template>
      </el-table-column>
    </tao-table>

    <!-- 审核对话框 -->
    <el-dialog title="审核提现申请" width="600px" :visible.sync="approveDialog.visible">
      <div class="approve-content">
        <el-descriptions title="提现详情" :column="2" border>
          <el-descriptions-item label="用户名">{{ approveDialog.data.userName }}</el-descriptions-item>
          <el-descriptions-item label="提现金额">${{ approveDialog.data.money }}</el-descriptions-item>
          <el-descriptions-item label="手续费">${{ approveDialog.data.moneyFee }}</el-descriptions-item>
          <el-descriptions-item label="实际到账">${{ approveDialog.data.momeyActual }}</el-descriptions-item>
          <el-descriptions-item label="支付方式">{{ getPayTypeName(approveDialog.data.payType) }}</el-descriptions-item>
          <el-descriptions-item label="收款账号">{{ approveDialog.data.uBackCard }}</el-descriptions-item>
          <el-descriptions-item label="收款人">{{ approveDialog.data.uBackUserName }}</el-descriptions-item>
          <el-descriptions-item label="申请时间">{{ formatDateTime(approveDialog.data.createTime) }}</el-descriptions-item>
        </el-descriptions>
        
        <div style="margin-top: 20px;">
          <el-form label-width="80px">
            <el-form-item label="审核意见：">
              <el-input 
                v-model="approveDialog.remark" 
                type="textarea" 
                rows="3" 
                placeholder="请输入审核意见（可选）">
              </el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
      
      <span slot="footer" class="dialog-footer">
        <el-button @click="approveDialog.visible = false">取消</el-button>
        <el-button type="primary" @click="handleApprove">确认通过</el-button>
      </span>
    </el-dialog>

    <!-- 拒绝对话框 -->
    <el-dialog title="拒绝提现申请" width="500px" :visible.sync="rejectDialog.visible">
      <el-form label-width="80px">
        <el-form-item label="拒绝原因：" required>
          <el-input 
            v-model="rejectDialog.reason" 
            type="textarea" 
            rows="4" 
            placeholder="请输入拒绝原因">
          </el-input>
        </el-form-item>
      </el-form>
      
      <span slot="footer" class="dialog-footer">
        <el-button @click="rejectDialog.visible = false">取消</el-button>
        <el-button type="danger" @click="handleReject">确认拒绝</el-button>
      </span>
    </el-dialog>

    <!-- 详情对话框 -->
    <el-dialog title="提现详情" width="700px" :visible.sync="detailDialog.visible">
      <el-descriptions :column="2" border>
        <el-descriptions-item label="用户ID">{{ detailDialog.data.uId }}</el-descriptions-item>
        <el-descriptions-item label="用户名">{{ detailDialog.data.userName }}</el-descriptions-item>
        <el-descriptions-item label="提现金额">${{ detailDialog.data.money }}</el-descriptions-item>
        <el-descriptions-item label="账户余额">${{ detailDialog.data.moneyBalance }}</el-descriptions-item>
        <el-descriptions-item label="手续费">${{ detailDialog.data.moneyFee }}</el-descriptions-item>
        <el-descriptions-item label="实际到账">${{ detailDialog.data.momeyActual }}</el-descriptions-item>
        <el-descriptions-item label="支付方式">{{ getPayTypeName(detailDialog.data.payType) }}</el-descriptions-item>
        <el-descriptions-item label="收款银行">{{ detailDialog.data.uBankName }}</el-descriptions-item>
        <el-descriptions-item label="收款账号">{{ detailDialog.data.uBackCard }}</el-descriptions-item>
        <el-descriptions-item label="收款人">{{ detailDialog.data.uBackUserName }}</el-descriptions-item>
        <el-descriptions-item label="用户IP">{{ detailDialog.data.uIp }}</el-descriptions-item>
        <el-descriptions-item label="用户地区">{{ detailDialog.data.uCity || '-' }}</el-descriptions-item>
        <el-descriptions-item label="申请时间">{{ formatDateTime(detailDialog.data.createTime) }}</el-descriptions-item>
        <el-descriptions-item label="审核时间">{{ detailDialog.data.successTime ? formatDateTime(detailDialog.data.successTime) : '-' }}</el-descriptions-item>
        <el-descriptions-item label="状态">
          <el-tag :type="getStatusType(detailDialog.data.status)">
            {{ getStatusText(detailDialog.data.status) }}
          </el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="备注">{{ detailDialog.data.msg || '-' }}</el-descriptions-item>
      </el-descriptions>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'UserTxianList',
  data() {
    return {
      searchForm: {
        username: '',
        userId: '',
        phone: '',
        status: '',
        payType: '',
        dateRange: [],
        minAmount: null,
        maxAmount: null,
        adminName: ''
      },
      selectedRows: [],
      approveDialog: {
        visible: false,
        data: {},
        remark: ''
      },
      rejectDialog: {
        visible: false,
        data: {},
        reason: ''
      },
      detailDialog: {
        visible: false,
        data: {}
      },
      // 模拟数据
      txianList: [
        {
          id: 1,
          createTime: '2025-05-30 22:52:07',
          successTime: null,
          money: '100.00',
          moneyBalance: '10001390.00',
          moneyFee: '2.00',
          momeyActual: '98.00',
          msg: '用户申请提现',
          uId: 7,
          userName: 'zhangsan',
          uIp: '98.159.43.112',
          uCity: '',
          adminUid: 0,
          status: 0,
          payType: 'usdt',
          uBankName: 'USDT-TRC20',
          uBackCard: 'TQn9Y2khEsLJW1ChVWFMSMeRDow5KcbLSE',
          uBackUserName: 'zhangsan',
          marketUid: 0
        },
        {
          id: 2,
          createTime: '2025-05-30 22:52:28',
          successTime: '2025-05-31 10:30:15',
          money: '1000.00',
          moneyBalance: '10001290.00',
          moneyFee: '20.00',
          momeyActual: '980.00',
          msg: '用户申请提现',
          uId: 7,
          userName: 'zhangsan',
          uIp: '98.159.43.112',
          uCity: '',
          adminUid: 1,
          status: 1,
          payType: 'usdt',
          uBankName: 'USDT-TRC20',
          uBackCard: 'TQn9Y2khEsLJW1ChVWFMSMeRDow5KcbLSE',
          uBackUserName: 'zhangsan',
          marketUid: 0
        },
        {
          id: 3,
          createTime: '2025-05-31 17:41:13',
          successTime: null,
          money: '5000.00',
          moneyBalance: '518440.00',
          moneyFee: '100.00',
          momeyActual: '4900.00',
          msg: '用户申请提现',
          uId: 16,
          userName: 'lisi',
          uIp: '114.134.191.164',
          uCity: '',
          adminUid: 0,
          status: 0,
          payType: 'huiwang',
          uBankName: '汇旺',
          uBackCard: '017919380',
          uBackUserName: 'Ahua',
          marketUid: 0
        },
        {
          id: 4,
          createTime: '2025-05-31 17:41:56',
          successTime: '2025-05-31 18:15:30',
          money: '5000.00',
          moneyBalance: '513440.00',
          moneyFee: '100.00',
          momeyActual: '4900.00',
          msg: '用户申请提现',
          uId: 16,
          userName: 'lisi',
          uIp: '114.134.191.164',
          uCity: '',
          adminUid: 2,
          status: 2,
          payType: 'huiwang',
          uBankName: '汇旺',
          uBackCard: '017919380',
          uBackUserName: 'Ahua',
          marketUid: 0
        },
        {
          id: 5,
          createTime: '2025-05-31 15:30:45',
          successTime: null,
          money: '2000.00',
          moneyBalance: '8500.00',
          moneyFee: '40.00',
          momeyActual: '1960.00',
          msg: '用户申请提现',
          uId: 39,
          userName: 'wangwu',
          uIp: '192.168.1.100',
          uCity: '北京',
          adminUid: 0,
          status: 0,
          payType: 'aba',
          uBankName: 'ABA银行',
          uBackCard: '001234567890',
          uBackUserName: '王五',
          marketUid: 0
        },
        {
          id: 6,
          createTime: '2025-05-31 14:22:18',
          successTime: '2025-05-31 16:45:20',
          money: '800.00',
          moneyBalance: '5200.00',
          moneyFee: '16.00',
          momeyActual: '784.00',
          msg: '用户申请提现',
          uId: 41,
          userName: 'zhaoliu',
          uIp: '203.45.67.89',
          uCity: '上海',
          adminUid: 1,
          status: 1,
          payType: 'usdt',
          uBankName: 'USDT-ERC20',
          uBackCard: '0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B',
          uBackUserName: '赵六',
          marketUid: 0
        }
      ],
      columns: [
        { name: "用户信息", show: true },
        { name: "提现金额", show: true },
        { name: "手续费", show: true },
        { name: "实际到账", show: true },
        { name: "收款信息", show: true },
        { name: "申请时间", show: true },
        { name: "状态", show: true },
        { name: "审核时间", show: true },
      ]
    };
  },
  computed: {
    filteredList() {
      let list = [...this.txianList];
      
      // 用户名筛选
      if (this.searchForm.username) {
        list = list.filter(item => 
          item.userName.includes(this.searchForm.username)
        );
      }
      
      // 用户ID筛选
      if (this.searchForm.userId) {
        list = list.filter(item => 
          item.uId.toString().includes(this.searchForm.userId)
        );
      }
      
      // 状态筛选
      if (this.searchForm.status !== '') {
        list = list.filter(item => 
          item.status.toString() === this.searchForm.status
        );
      }
      
      // 支付方式筛选
      if (this.searchForm.payType) {
        list = list.filter(item => 
          item.payType === this.searchForm.payType
        );
      }
      
      return list;
    }
  },
  methods: {
    // 搜索
    handleSearch() {
      this.$message.success('搜索完成');
    },
    
    // 重置
    handleReset() {
      this.searchForm = {
        username: '',
        userId: '',
        phone: '',
        status: '',
        payType: '',
        dateRange: [],
        minAmount: null,
        maxAmount: null,
        adminName: ''
      };
      this.$message.info('已重置搜索条件');
    },
    
    // 导出
    handleExport() {
      this.$message.success('正在导出数据...');
    },
    
    // 刷新
    handleRefresh() {
      this.$message.success('数据已刷新');
    },
    
    // 选择变化
    handleSelectionChange(selection) {
      this.selectedRows = selection;
    },
    
    // 批量审核通过
    handleBatchApprove() {
      if (this.selectedRows.length === 0) {
        this.$message.warning('请选择要审核的记录');
        return;
      }
      
      this.$confirm(`确定要批量通过 ${this.selectedRows.length} 条提现申请吗？`, '确认操作', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 模拟批量审核
        this.selectedRows.forEach(row => {
          const index = this.txianList.findIndex(item => item.id === row.id);
          if (index !== -1 && this.txianList[index].status === 0) {
            this.txianList[index].status = 1;
            this.txianList[index].successTime = new Date().toISOString().slice(0, 19).replace('T', ' ');
            this.txianList[index].adminUid = 1;
          }
        });
        this.$message.success(`已批量通过 ${this.selectedRows.length} 条申请`);
        this.selectedRows = [];
      });
    },
    
    // 批量拒绝
    handleBatchReject() {
      if (this.selectedRows.length === 0) {
        this.$message.warning('请选择要拒绝的记录');
        return;
      }
      
      this.$confirm(`确定要批量拒绝 ${this.selectedRows.length} 条提现申请吗？`, '确认操作', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 模拟批量拒绝
        this.selectedRows.forEach(row => {
          const index = this.txianList.findIndex(item => item.id === row.id);
          if (index !== -1 && this.txianList[index].status === 0) {
            this.txianList[index].status = 2;
            this.txianList[index].successTime = new Date().toISOString().slice(0, 19).replace('T', ' ');
            this.txianList[index].adminUid = 1;
          }
        });
        this.$message.success(`已批量拒绝 ${this.selectedRows.length} 条申请`);
        this.selectedRows = [];
      });
    },
    
    // 显示审核对话框
    showApproveDialog(row) {
      this.approveDialog.data = { ...row };
      this.approveDialog.remark = '';
      this.approveDialog.visible = true;
    },
    
    // 显示拒绝对话框
    showRejectDialog(row) {
      this.rejectDialog.data = { ...row };
      this.rejectDialog.reason = '';
      this.rejectDialog.visible = true;
    },
    
    // 显示详情
    showDetail(row) {
      this.detailDialog.data = { ...row };
      this.detailDialog.visible = true;
    },
    
    // 审核通过
    handleApprove() {
      const index = this.txianList.findIndex(item => item.id === this.approveDialog.data.id);
      if (index !== -1) {
        this.txianList[index].status = 1;
        this.txianList[index].successTime = new Date().toISOString().slice(0, 19).replace('T', ' ');
        this.txianList[index].adminUid = 1;
        if (this.approveDialog.remark) {
          this.txianList[index].msg = this.approveDialog.remark;
        }
      }
      
      this.approveDialog.visible = false;
      this.$message.success('审核通过成功');
    },
    
    // 拒绝申请
    handleReject() {
      if (!this.rejectDialog.reason.trim()) {
        this.$message.warning('请输入拒绝原因');
        return;
      }
      
      const index = this.txianList.findIndex(item => item.id === this.rejectDialog.data.id);
      if (index !== -1) {
        this.txianList[index].status = 2;
        this.txianList[index].successTime = new Date().toISOString().slice(0, 19).replace('T', ' ');
        this.txianList[index].adminUid = 1;
        this.txianList[index].msg = this.rejectDialog.reason;
      }
      
      this.rejectDialog.visible = false;
      this.$message.success('已拒绝该提现申请');
    },
    
    // 列显示控制
    changeColumn(columns) {
      this.columns = columns;
      this.$refs.table.doLayout();
    },
    
    // 获取状态类型
    getStatusType(status) {
      switch (status) {
        case 0: return 'warning';  // 待审核
        case 1: return 'success';  // 已通过
        case 2: return 'danger';   // 已拒绝
        default: return 'info';
      }
    },
    
    // 获取状态文本
    getStatusText(status) {
      switch (status) {
        case 0: return '待审核';
        case 1: return '已通过';
        case 2: return '已拒绝';
        default: return '未知';
      }
    },
    
    // 获取支付方式名称
    getPayTypeName(payType) {
      switch (payType) {
        case 'usdt': return 'USDT';
        case 'huiwang': return '汇旺';
        case 'aba': return 'ABA银行';
        default: return payType;
      }
    },
    
    // 获取支付方式颜色
    getPayTypeColor(payType) {
      switch (payType) {
        case 'usdt': return 'success';
        case 'huiwang': return 'primary';
        case 'aba': return 'warning';
        default: return 'info';
      }
    },
    
    // 格式化日期时间
    formatDateTime(datetime) {
      if (!datetime) return '-';
      return datetime.replace('T', ' ').substring(0, 19);
    }
  }
}
</script>

<style lang='scss' scoped>
.page-content {
  width: 100%;
  height: 100%;
  
  .user-info {
    .username {
      font-weight: bold;
      color: #303133;
    }
    .user-id {
      font-size: 12px;
      color: #909399;
      margin-top: 2px;
    }
  }
  
  .amount-info {
    .main-amount {
      font-size: 16px;
      font-weight: bold;
      color: #303133;
    }
  }
  
  .fee-amount {
    color: #F56C6C;
    font-weight: bold;
  }
  
  .actual-amount {
    color: #67C23A;
    font-weight: bold;
    font-size: 14px;
  }
  
  .payment-info {
    .pay-type {
      margin-bottom: 5px;
    }
    .account-info {
      font-size: 12px;
      color: #606266;
      .account-number {
        color: #909399;
        word-break: break-all;
      }
    }
  }
  
  .approve-content {
    .el-descriptions {
      margin-bottom: 20px;
    }
  }
}

// 响应式设计
@media (max-width: 768px) {
  .page-content {
    .el-form {
      .el-row {
        .el-col {
          margin-bottom: 10px;
        }
      }
    }
    
    .amount-info .main-amount {
      font-size: 14px;
    }
  }
}
</style>