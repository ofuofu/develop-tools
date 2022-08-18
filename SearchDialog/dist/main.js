"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class SearchDialogMain {
    constructor() {
        this.targetUrl = 'https://getdatalist.azurewebsites.net/api/GetSampleData01';
        this.accessKey = 'HmgM03n4M-TMk4I-kFLkC8DRUMaieEtDxaykadTu2CxmAzFujwaGLw==';
        this.startIndex = 1;
        this.rowCount = 10;
        this.showDialogButton = document.getElementById("ShowSearchDialogButton");
        this.searchDialog = document.getElementById("SearchDialog");
        this.searchButton = document.getElementById("SearchButton");
        this.searchDialogTable = document.getElementById("SearchDialogTable");
        this.searchDialogDefaultCancel = document.getElementsByClassName("SearchDialogDefaultCancel")[0];
        this.dataIndex = document.getElementById("DataIndex");
        this.japanName = document.getElementById("JapanName");
        this.romeName = document.getElementById("RomeName");
        this.age = document.getElementById("Age");
    }
    initDialog() {
        this.showDialogButton.addEventListener('click', () => {
            this.searchDialog.showModal();
        });
        this.searchDialog.addEventListener('close', () => {
            console.log('close searchDialog');
        });
        this.searchDialog.addEventListener('cancel', () => {
            console.log('cancel searchDialog');
        });
        this.searchButton.addEventListener('click', () => {
            this.setMemgerList();
        });
        // TableのRowを削除
        const rowsCount = this.searchDialogTable.rows.length;
        for (let i = 0; i < rowsCount - 1; i++) {
            // Thを残してすべての行の削除
            this.searchDialogTable.deleteRow(-1);
        }
        this.searchDialogDefaultCancel.addEventListener('click', () => {
            this.searchDialog.close();
        });
        this.setMemgerList();
    }
    setMemgerList() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(this.targetUrl + '?code=' + this.accessKey +
                '&startindex=' + this.startIndex + '&rowcount=' + this.rowCount);
            const dataList = yield response.json();
            if (dataList.length == 0) {
                this.searchButton.disabled = true;
                this.searchButton.style.color = "white";
                return;
            }
            for (let i = 0; i < dataList.length; i++) {
                if (i === dataList.length - 1) {
                    this.startIndex = dataList[i].dataIndex + 1;
                }
                let newRow = this.searchDialogTable.insertRow(-1);
                let newCell = newRow.insertCell(-1);
                newCell.innerText = dataList[i].dataIndex;
                newCell.style.width = "60px";
                newCell = newRow.insertCell(-1);
                newCell.innerText = dataList[i].japanName;
                newCell.style.width = "180px";
                newCell = newRow.insertCell(-1);
                newCell.innerText = dataList[i].romeName;
                newCell.style.width = "180px";
                newCell = newRow.insertCell(-1);
                newCell.innerText = dataList[i].age;
                newCell.style.width = "60px";
                newRow.addEventListener('click', (elm) => {
                    const tableTr = elm.currentTarget;
                    this.dataIndex.value = tableTr.cells[0].innerText;
                    this.japanName.value = tableTr.cells[1].innerText;
                    this.romeName.value = tableTr.cells[2].innerText;
                    this.age.value = tableTr.cells[3].innerText;
                    this.searchDialog.close();
                });
            }
        });
    }
}
const main = new SearchDialogMain();
main.initDialog();
//# sourceMappingURL=main.js.map