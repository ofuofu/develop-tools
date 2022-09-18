type IMember = {
    dataIndex: number;
    japanName: string;
    romeName: string;
    age: number;
}

class SearchDialogMain {
    searchButton: HTMLButtonElement;
    showDialogButton: HTMLButtonElement;
    searchDialog: HTMLDialogElement;
    //targetUrl: string = 'https://getdatalist.azurewebsites.net/api/GetSampleData01';
    targetUrl: string = 'https://hytesttoolsfunc.azurewebsites.net/api/GetSampleData01';
    //accessKey: string = 'HmgM03n4M-TMk4I-kFLkC8DRUMaieEtDxaykadTu2CxmAzFujwaGLw==';
    accessKey: string = '7HrnnJNX-7Hg97TMrpRLtBFj68UGsWZdFeKL66pnyzy8AzFuLV83gQ==';
    startIndex: number = 1;
    rowCount: number = 10;
    searchDialogTable: HTMLTableElement;
    searchDialogDefaultCancel: HTMLSpanElement;
    dataIndex: HTMLInputElement;
    japanName: HTMLInputElement;
    romeName: HTMLInputElement;
    age: HTMLInputElement;

    constructor() {
        this.showDialogButton = <HTMLButtonElement>document.getElementById("ShowSearchDialogButton");
        this.searchDialog = <HTMLDialogElement>document.getElementById("SearchDialog");
        this.searchButton = <HTMLButtonElement>document.getElementById("SearchButton");
        this.searchDialogTable = <HTMLTableElement>document.getElementById("SearchDialogTable");
        this.searchDialogDefaultCancel = <HTMLSpanElement>document.getElementsByClassName("SearchDialogDefaultCancel")[0];
        this.dataIndex = <HTMLInputElement>document.getElementById("DataIndex");
        this.japanName = <HTMLInputElement>document.getElementById("JapanName");
        this.romeName = <HTMLInputElement>document.getElementById("RomeName");
        this.age = <HTMLInputElement>document.getElementById("Age");
    }

    initDialog() {
        this.showDialogButton.addEventListener('click', () => {
            this.searchDialog.showModal();
        });
        this.searchDialog.addEventListener('close', ()=> {
            console.log('close searchDialog')
        });
        this.searchDialog.addEventListener('cancel', ()=> {
            console.log('cancel searchDialog')
        });
        this.searchButton.addEventListener('click', ()=> {
            this.setMemgerList();
        });
        // TableのRowを削除
        const rowsCount: number = this.searchDialogTable.rows.length;
        for (let i = 0; i < rowsCount -1; i++) {
            // Thを残してすべての行の削除
            this.searchDialogTable.deleteRow(-1);
        }
        this.searchDialogDefaultCancel.addEventListener('click', ()=> {
            this.searchDialog.close();
        });
        this.setMemgerList();
    }
    
    async setMemgerList() {
        try {
            const response: Response = await fetch(
                this.targetUrl + '?code=' + this.accessKey + 
                '&startindex=' + this.startIndex + '&rowcount=' + this.rowCount);
            if (!response.ok) {
                console.log(response.statusText);
                return;
            }
            const dataList = await response.json();

            if (dataList.length == 0) {
                this.searchButton.disabled = true;
                this.searchButton.style.color = "white";
                return;
            }
            for (let i = 0; i < dataList.length; i++) {
                if (i === dataList.length -1) {
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
    
                newRow.addEventListener('click', (elm)=> {
                    const tableTr: HTMLTableRowElement = <HTMLTableRowElement>elm.currentTarget;                
                    this.dataIndex.value = tableTr.cells[0].innerText;
                    this.japanName.value = tableTr.cells[1].innerText;
                    this.romeName.value = tableTr.cells[2].innerText;
                    this.age.value = tableTr.cells[3].innerText;
                    this.searchDialog.close();
                });    
            }    
        } catch (err) {
            console.log(err);
        }
    }
}

const main = new SearchDialogMain();
main.initDialog();

