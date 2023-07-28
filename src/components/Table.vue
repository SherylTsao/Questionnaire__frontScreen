<script>
// import { Modal } from 'bootstrap';
import { RouterLink } from "vue-router";

export default {
    props: { // 來自父層
        columns: { // 為表個欄位名稱
            type: Array,
            required: true
        }, data: { // 為表格內容，必需為陣列形式
            type: Array,
            required: true
        }, itemsPerPage: { // 分頁，預設一頁為15筆資料 
            type: Number,
            default: 10
        },
        showDelete: false,
        showControl: false, // 顯示操作行
        showEditButton: false,  // 是否顯示修改按鈕
        showDeleteButton: false,  // 是否顯示刪除按鈕
        showCompleteButton: false, // 是否顯示完成按鈕
        showFilloutButton: false,//是否顯示填寫按鈕
        showEdit: false, //是否變更按鈕
        showStatisticsButton: false,//是否顯示統計按鈕
        showChooseButton: false, // 顯示選擇按鈕
        showEditByUpdateQuestion: false,//顯示刪除問題按鈕
        showDeleteQuestionBtn: false,//顯示刪除問題按鈕
        seeWriteBtn: false,//顯示觀看細節
        watchDetailsBtn: false//顯示詳細檢視

    },
    data() {
        return {
            currentPage: 1, // 分頁預設第1頁
            displayedPages: [],
            control: false, // 可否操作
            statistics: false,
            item: {}, // 子層參數
            deleteList: []
        };
    },
    computed: {
        totalPages() { // 計算總頁數的方法

            return Math.ceil(this.data.length / this.itemsPerPage);
        },
        paginatedData() { // 顯示目前頁數資料總筆數的方法
            const sortedData = this.data.slice().reverse(); // 最新資料顯示在最上面
            const startIndex = (this.currentPage - 1) * this.itemsPerPage; // 起始筆數
            const endIndex = startIndex + this.itemsPerPage; // 終止筆數
            return sortedData.slice(startIndex, endIndex); // 回傳該頁筆數的序號
        }
    },
    methods: {
        watchListRes(item) {
            this.$emit('watchList', item); // 触发updateQInfo事件并将索引作为参数传递给父组件
            console.log(item);
        },
        updateQuestionnaire(item) {
            this.$emit('updateQInfo', item); // 触发updateQInfo事件并将索引作为参数传递给父组件
            console.log(item);
        },

        addDelete(item) {
            console.log(item.questionnaireId + "問卷的UUID");
            console.log(item);
            console.log(item.checkBox + "check");
            if (item.checkBox) {
                this.deleteList.push(item.questionnaireId);
                console.log("刪除的list TTT");
                console.log(this.deleteList);
            } else {
                this.deleteList = this.deleteList.filter(id => id !== item.questionnaireId);
                console.log("刪除的list FFF");
                console.log(this.deleteList);
            }

            this.$emit("deleteQuestionnaire", this.deleteList)

        },
        previousPage() { // 前一頁方法
            if (this.currentPage > 1) {
                this.currentPage--;
            }
            this.updateDisplayedPages();
        }, nextPage() { // 後一頁方法
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
            }
            this.updateDisplayedPages();
        }, goToPage(page) { // 跳至該分頁
            this.currentPage = page;
            this.updateDisplayedPages();
        }, updateDisplayedPages() {
            const range = 2; // 顯示的頁碼範圍，根據需求進行調整
            const startPage = Math.max(1, this.currentPage - range);
            const endPage = Math.min(this.totalPages, this.currentPage + range);
            this.displayedPages = [];
            if (endPage > startPage) {
                for (let i = startPage; i <= endPage; i++) {
                    this.displayedPages.push(i);
                }
            } else if (this.totalPages > 4) {
                this.displayedPages.push(1);
                this.displayedPages.push(2);
                this.displayedPages.push(3);
            } else {
                for (let i = 1; i <= this.totalPages; i++) {
                    this.displayedPages.push(i);
                }
            }
        }, editItem(item) {
            this.$emit('edit', item); // 触发edit事件并将索引作为参数传递给父组件
        }, deleteItem(item) {
            this.$emit('delete', item); // 触发delete事件并将索引作为参数传递给父组件
        }, completeItem(item) {
            this.$emit('complete', item); // 触发complete事件并将索引作为参数传递给父组件
        }
        , chooseItem() {
            const list = this.paginatedData.filter(item => item.selected)
            this.$emit('choose', list); // 触发choose事件并将索引作为参数传递给父组件
        }
    },
    watch: {
        data(newData) {
            this.updateDisplayedPages();
        }
    }
};
</script>

<template>
    <div class="position-relative w-95%">
        <table class="table mb-5 table-striped table-fixed table-hover">
            <thead> <!-- 標題名稱 -->
                <tr class="table-dark"> <!-- 使用迴圈印出"標題名稱" -->
                    <!-- vif -->
                    <th v-if="showDelete"> <!-- 新增 "刪除" 欄位 -->
                        <div>
                            <label for="delete"></label>
                        </div>
                    </th>
                    <th v-for="column in columns">{{ column.column }}</th>
                    <th v-if="showFilloutButton"> <!-- 新增 "填寫" 欄位 -->
                        <div>
                            <label for="fillout">填寫</label>
                        </div>
                    </th>
                    <th v-if="showEdit"> <!-- 新增 "變更" 欄位 -->
                        <div>
                            <label for="edit">変更</label>
                        </div>
                    </th>
                    <th v-if="showEditByUpdateQuestion"> <!-- 新增 "變更" 欄位 -->
                        <div>
                            <label for="edit">変更</label>
                        </div>
                    </th>
                    <!-- 新增 "統計" 欄位 -->
                    <!-- <th v-if="showStatisticsButton"> 
                        <div>
                            <label for="statistics">統計</label>
                        </div>
                    </th> -->
                    <th v-if="showDeleteQuestionBtn"> <!-- 新增 "刪除" 欄位 -->
                        <div>
                            <label for="delete">刪除</label>
                        </div>
                    </th>
                    <th v-if="seeWriteBtn"> <!-- 新增 "觀看" 欄位 -->
                        <div>
                            <label for="seeWrite">觀看</label>
                        </div>
                    </th>
                    <th v-if="showControl"> <!-- 新增 "操作" 欄位 -->
                        <div class="">
                            <input type="checkbox" id='control' value="false" v-model="control">
                            <label for="control">操作</label>
                        </div>
                    </th>
                    <th v-if="showChooseButton">
                        <button class="btn btn-secondary py-0" @click="chooseItem">選ぶ</button>
                    </th>

                    <th v-if="watchDetailsBtn"> <!-- 新增 "詳細檢視" 欄位 -->
                        <div>
                            <label for="watchDetails">詳細檢視</label>
                        </div>
                    </th>

                </tr>
            </thead>
            <!-- ---------------------------- -->
            <tbody> <!-- 表格內容 -->
                <tr v-for="(item, index) in paginatedData" :key="item.id"> <!-- 印出該分頁筆數(列) -->

                    <td v-if="showDelete"><!-- 刪除的checkbox -->
                        <input type="checkbox" name="" id="" @change="addDelete(item)" v-model="item.checkBox">
                    </td>
                    <td v-for="column in columns">{{ item[column.key] }}</td> <!-- 印出該分頁對應標題的內容(欄) -->

                    <td v-if="showFilloutButton"><!-- 填寫的按鈕 -->
                        <button class="btn btn-secondary py-0">
                            <RouterLink :to="{ path: '/fill-out', query: { item: item.questionnaireId } }">
                                填寫
                            </RouterLink>
                        </button>
                    </td>
                    <td v-if="showEdit"><!-- 變更問卷、問題的按鈕 -->
                        <button class="btn btn-secondary py-0" @click="updateQuestionnaire(item)">

                            <RouterLink :to="{ path: '/update-questionnaire', query: { item: item.questionnaireId } }">変更
                            </RouterLink>
                        </button>
                    </td>
                    <td v-if="showEditByUpdateQuestion"><!-- 變更的按鈕 -->
                        <button class="btn btn-secondary py-0" @click="updateQuestionnaire(item)">
                            變更問題
                        </button>
                    </td>
                    <td v-if="showDeleteQuestionBtn"><!-- 刪除問題的按鈕 -->
                        <button class="btn btn-danger py-0" @click="deleteItem(item)">刪除</button>
                    </td>
                    <!-- 統計的按鈕 -->
                    <!-- <td v-if="showStatisticsButton">
                        <button class="btn btn-secondary py-0">統計</button>
                    </td> -->
                    <td v-if="seeWriteBtn"><!-- 觀看統計的按鈕 -->
                        <button class="btn btn-secondary py-0" @click="watchListRes(item)">
                            <RouterLink :to="{ path: '/list-res', query: { item: item.questionnaireId } }">
                                視聴統計
                            </RouterLink>
                        </button>
                    </td>
                    <td v-if="watchDetailsBtn"><!-- 詳細檢視的按鈕 -->
                        <button class="btn btn-secondary py-0">
                            <RouterLink :to="{ path: '/one-res', query: { item: item.participantId } }">
                                視聴
                            </RouterLink>
                        </button>
                    </td>


                    <!-- 進行編輯修改操作的按鈕 -->
                    <!-- btn-primary  -->
                    <!-- <td v-if="showControl">
                        <button class="btn btn-secondary text-white py-0" v-if="control && showEditButton"
                            @click="editItem(item)">変更</button>
                        <button class="btn btn-danger py-0" v-if="control && showDeleteButton"
                            @click="deleteItem(item)">削除</button>
                        <button class="btn btn-secondary py-0" v-if="control && showCompleteButton"
                            @click="completeItem(item)">完了</button>

                    </td> -->

                    <td v-if="showChooseButton">
                        <input type="checkbox" id=item v-model="item.selected">
                    </td>

                </tr>
            </tbody>
        </table>
        <!-- ---------------------------- -->

        <nav aria-label="Page navigation example" class="position-absolute top-100 start-50 translate-middle"
            style="margin-top: 25px;">
            <!-- 分頁切換按鈕 -->
            <ul class="pagination">
                <li class="page-item"> <!-- 前頁 -->
                    <a class="page-link" aria-label="Previous" @click="previousPage" :disabled="currentPage === 1">
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li> <!-- 至該分頁 -->
                <li class="page-item" v-if="currentPage > 3">
                    <a class="page-link" @click="goToPage(1)">1</a>
                </li>
                <li class="page-item" v-if="currentPage > 4">
                    <span class="page-link">...</span>
                </li>
                <li class="page-item" v-for="page in displayedPages" :key="page" :class="{ active: page === currentPage }">
                    <a class="page-link" @click="goToPage(page)">{{ page }}</a>
                </li>
                <li class="page-item" v-if="currentPage < totalPages - 3">
                    <span class="page-link">...</span>
                </li>
                <li class="page-item" v-if="currentPage < totalPages - 2">
                    <a class="page-link" @click="goToPage(totalPages)">{{ totalPages }}</a>
                </li>
                <li class="page-item"> <!-- 後頁 -->
                    <a class="page-link" aria-label="Next" @click="nextPage" :disabled="currentPage === totalPages">
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>
            </ul>
        </nav>
    </div>
</template>

<style scoped>
.table-fixed {
    table-layout: fixed;
    width: 100%;
}

.pagination .page-link:hover {
    cursor: pointer;
}

.btn {
    color: white;
}
</style>